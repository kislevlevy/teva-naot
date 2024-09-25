import React, { useEffect, useState } from 'react';

import {
  TextInput,
  Textarea,
  Button,
  Table,
  Popover,
  Card,
  Label,
} from 'flowbite-react';
import { Icon } from '@mdi/react';
import { mdiPencil, mdiPlus, mdiTrashCanOutline, mdiWindowClose } from '@mdi/js';

import {
  useCreateProductMutation,
  useEditProductByIdMutation,
  useLazyGetProductByIdQuery,
} from '../../../slices/api/apiProductsSlices';
import FileDropzone from './_FileUpload';
import ConfirmationModal from '../../helpers/ConfermationModal';
import { useDeleteProductColorByIdMutation } from '../../../slices/api/apiProductsColorsSlices';
import ProductColorEditor from './_ProductColorEditor';
import { toMoneyString } from '../../../utils/helperFunctions';

const initialState = {
  name: '',
  price: '',
  description: '',
  category: '',
  image: '',
  colors: [],
};

export default function ProductEditor({ setSelectedProductId, selectedProductId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingColor, setIsEditingColor] = useState(false);

  const [product, setProduct] = useState(initialState);
  const [productColor, setProductColor] = useState(null);
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [getProductById, { isSuccess, data }] = useLazyGetProductByIdQuery();
  const [editProductById] = useEditProductByIdMutation();
  const [createProduct] = useCreateProductMutation();

  useEffect(() => {
    if (selectedProductId === 'new') {
      setProduct(initialState);
      setIsEditing(true);
    } else getProductById('/full-info/' + selectedProductId);
    isSuccess && setProduct(data.data.doc);
  }, [data, selectedProductId]);

  useEffect(() => {
    setProduct(initialState);
  }, [selectedProductId]);

  const handleEditClick = () => setIsEditing(!isEditing);
  const handleClose = () => {
    setSelectedProductId('');
  };

  const handleInputChange = (e, key, i) => {
    switch (key) {
      case 'image':
        setProduct((prev) => ({ ...prev, [key]: e[0] }));
        break;
      case 'availableSizes':
        setProduct((prev) => ({ ...prev, [key]: e }));
        break;
      case 'category':
        setProduct((prev) => ({ ...prev, [key]: e.target.value.split(',') }));
        break;
      default:
        setProduct((prev) => ({ ...prev, [key]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { name, price, description, image, category } = product;
      console.log(category);

      const productFormData = new FormData();
      name && productFormData.append('name', name);
      price && productFormData.append('price', price);
      description && productFormData.append('description', description.split(','));
      image && productFormData.append('image', image);
      category && productFormData.append('category', category.split(','));

      const length = Array.from(productFormData.entries()).length;

      if (selectedProductId === 'new') {
        if (!name || !price || !description || !image || !category)
          throw new Error('* עליך למלא את כל השדות.');
        await createProduct(productFormData);
        setSelectedProductId('');
      } else {
        if (length < 1) throw new Error('* עליך למלא שדה אחד לפחות.');
        await editProductById({ id: selectedProductId, body: productFormData });
      }
      setIsEditing(false);
      setIsError('');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return setIsError(err.message || '* משהו לא עבד... נסה שנית מאוחר יותר.');
    }
  };

  return (
    <Card className="container mx-auto p-4 rtl">
      <ProductColorEditor
        {...{
          isEditingColor,
          setIsEditingColor,
          color: productColor,
          setColor: setProductColor,
        }}
      />

      <div
        className="hover:text-gray-600 text-gray-500 cursor-pointer"
        onClick={handleClose}
      >
        <Icon path={mdiWindowClose} size={1} />
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className=" w-60 h-60">
          {isEditing ? (
            <FileDropzone setFiles={(e) => handleInputChange(e, 'image')} />
          ) : (
            <img className="rounded-lg" src={product.image} alt={product.name} />
          )}
        </div>
        <div className="space-y-2 w-3/4">
          <div>
            <Label value="שם מוצר" />
            <TextInput
              disabled={!isEditing}
              type="text"
              placeholder="שם"
              value={product.name}
              onChange={(e) => handleInputChange(e, 'name')}
              className="rounded"
            />
          </div>
          <div>
            <Label value="מחיר" />
            <TextInput
              disabled={!isEditing}
              type="number"
              placeholder="מחיר"
              value={product.price}
              onChange={(e) => handleInputChange(e, 'price')}
              className="rounded"
            />
          </div>
          <div>
            <Label value="תיאור" />
            <Textarea
              disabled={!isEditing}
              placeholder="תיאור"
              value={product.description}
              onChange={(e) => handleInputChange(e, 'description')}
              className="rounded"
            />
          </div>
          <div>
            <Label value="קטגוריות" />
            <TextInput
              disabled={!isEditing}
              type="text"
              placeholder="קטגוריות"
              value={product.category}
              onChange={(e) => handleInputChange(e, 'category')}
              className="rounded"
            />
          </div>
        </div>
      </div>
      {isError && <p className="rtl mt-4 text-sm text-red-500">{isError}</p>}
      <div className="flex w-full justify-center gap-x-1">
        {isEditing ? (
          <>
            <Button onClick={handleSubmit} color="success" isProcessing={isLoading}>
              שמור
            </Button>
            <Button
              onClick={selectedProductId === 'new' ? handleClose : handleEditClick}
              color="failure"
            >
              בטל
            </Button>
          </>
        ) : (
          <Button onClick={handleEditClick} color="warning">
            ערוך
          </Button>
        )}
      </div>

      {selectedProductId === 'new' || (
        <Table hoverable>
          <Table.Head className="text-center">
            <Table.HeadCell>צבע</Table.HeadCell>
            <Table.HeadCell>תמונות</Table.HeadCell>
            <Table.HeadCell>מחיר</Table.HeadCell>
            <Table.HeadCell>מחיר לפני הנחה</Table.HeadCell>
            <Table.HeadCell>מידות{'\n'}ומלאי</Table.HeadCell>
            <Table.HeadCell>
              <Button
                size="xs"
                color="success"
                onClick={() => {
                  setIsEditingColor(true);
                  setProductColor({ _id: 'new', product: selectedProductId });
                }}
              >
                <Icon path={mdiPlus} size={0.6} />
              </Button>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {product.colors.map((color, i) => (
              <TableEntry
                {...{ color, setProductColor, isEditingColor, setIsEditingColor }}
                key={'color' + i}
              />
            ))}
          </Table.Body>
        </Table>
      )}
    </Card>
  );
}

function TableEntry({ color, setIsEditingColor, setProductColor }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [deleteProductColorById] = useDeleteProductColorByIdMutation();

  useEffect(() => {
    if (isConfirmed) {
      deleteProductColorById(color._id);
      setIsConfirmOpen(false);
    }
  }, [isConfirmed]);

  return (
    <Table.Row>
      <ConfirmationModal
        {...{
          isConfirmOpen,
          setIsConfirmOpen,
          message:
            'בלחיצה על אישור תמחק את המוצר הנבחר לצמיתות, פעולה זאת לא ניתנת להפיכה. האם תרצה להמשיך?',
          setIsConfirmed,
        }}
      />
      <Table.Cell>
        <p className="rtl">{color.name}</p>
      </Table.Cell>

      <Table.Cell className="flex justify-center">
        <div className="grid grid-cols-3 gap-1 max-w-52">
          {color.images.map((image, i) => (
            <img
              key={'color-img-' + i}
              src={image}
              alt={color.name}
              className="w-36"
            />
          ))}
        </div>
      </Table.Cell>
      <Table.Cell dir="ltr">
        <p>{toMoneyString(color.price)}</p>
      </Table.Cell>
      <Table.Cell dir="ltr">
        <p>
          {color.priceBeforeDiscount
            ? toMoneyString(color.priceBeforeDiscount)
            : toMoneyString(color.price)}
        </p>
      </Table.Cell>
      <Table.Cell>
        <Popover
          content={
            <div
              dir="ltr"
              className="flex flex-wrap max-w-32 justify-center p-1 gap-x-2 items-center"
            >
              {Object.entries(color.sizes).map(([size, stock], i) => (
                <div key={'size-' + i}>
                  {size}- {stock}
                </div>
              ))}
            </div>
          }
        >
          <Button className="mx-auto" size="xs">
            הצג
          </Button>
        </Popover>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col space-y-1 justify-center w-fit">
          <Button
            size="xs"
            color="warning"
            onClick={() => {
              setIsEditingColor(true);
              setProductColor(color);
            }}
          >
            <Icon path={mdiPencil} size={0.6} />
          </Button>
          <Button size="xs" color="failure" onClick={() => setIsConfirmOpen(true)}>
            <Icon path={mdiTrashCanOutline} size={0.6} />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}
