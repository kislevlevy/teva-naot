import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  TextInput,
  Table,
  Select,
  Label,
  FileInput,
} from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiPencilOutline } from '@mdi/js';
import { FileDropzone } from './_FileUpload';
import {
  useCreateProductColorMutation,
  useEditProductColorByIdMutation,
} from '../../../slices/api/apiProductsColorsSlices';

const initialState = {
  name: '',
  thumbnail: ['hex', ''],
  images: [],
  price: '',
  priceBeforeDiscount: '',
  sizes: {},
};

export default function ProductColorEditor({
  isEditingColor,
  setIsEditingColor,
  color,
  setColor,
}) {
  const [productColor, setProductColor] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [editProductColorById] = useEditProductColorByIdMutation();
  const [createProductColor] = useCreateProductColorMutation();

  const handleInputChange = (e, key, i) => {
    switch (key) {
      case 'images':
        setProductColor((prev) => ({ ...prev, [key]: e }));
        break;
      case 'thumbnail.type':
        setProductColor((prev) => ({
          ...prev,
          thumbnail: [e.target.value, productColor.thumbnail[1]],
        }));
        break;
      case 'thumbnail.hex':
        setProductColor((prev) => ({
          ...prev,
          thumbnail: [productColor.thumbnail[0], e.target.value],
        }));
        break;
      case 'thumbnail.img':
        setProductColor((prev) => ({
          ...prev,
          thumbnail: [productColor.thumbnail[0], e],
        }));
        break;
      case 'sizes':
        setProductColor((prev) => ({
          ...prev,
          sizes: { ...productColor.sizes, [i]: e.target.value },
        }));
        break;
      default:
        setProductColor((prev) => ({ ...prev, [key]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const { name, thumbnail, images, price, sizes, priceBeforeDiscount } =
        productColor;

      const productColorFormData = new FormData();
      name && productColorFormData.append('name', name);
      price && productColorFormData.append('price', price);
      sizes &&
        productColorFormData.append('sizes', JSON.stringify(Object.entries(sizes)));
      thumbnail &&
        productColorFormData.append('thumbnail', JSON.stringify(thumbnail));
      priceBeforeDiscount &&
        productColorFormData.append('priceBeforeDiscount', priceBeforeDiscount);
      images &&
        images.forEach((image) => productColorFormData.append('images', image));

      const length = Array.from(productColorFormData.entries()).length;

      if (color._id === 'new') {
        if (length !== 6) throw new Error('* עליך למלא את כל השדות.');
        productColorFormData.append('product', color.product);
        await createProductColor(productColorFormData);
      } else {
        if (length < 1) throw new Error('* עליך למלא שדה אחד לפחות.');
        await editProductColorById({
          id: color._id,
          body: productColorFormData,
        });
      }

      setIsLoading(false);
      handleClose();
    } catch (err) {
      setIsLoading(false);
      return setIsError(err.message);
    }
  };

  const handleClose = () => {
    setProductColor(initialState);
    setIsEditingColor(false);
    setIsEditing(false);
    setIsError('');
    setColor(null);
  };

  useEffect(() => {
    if (color?._id === 'new') {
      setIsEditing(true);
      setProductColor(initialState);
    } else setProductColor(color);
  }, [color]);

  if (productColor)
    return (
      <Modal
        dismissible
        show={isEditingColor}
        onClose={handleClose}
        size="xl"
        popup={true}
      >
        <Modal.Header className="bg-white border-b border-gray-200">
          <Icon path={mdiPencilOutline} size={1.2} />
        </Modal.Header>
        <Modal.Body className="bg-white mt-5">
          <div className="space-y-4 rtl">
            <div>
              <Label value="שם צבע" />
              <TextInput
                placeholder="שם צבע"
                value={productColor.name}
                disabled={!isEditing}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </div>
            <div>
              <Label value="תקדים צבע" />
              <div dir="rtl" className="flex items-center gap-x-1">
                <Select
                  className="w-20"
                  disabled={!isEditing}
                  value={productColor.thumbnail[0]}
                  onChange={(e) => handleInputChange(e, 'thumbnail.type')}
                >
                  <option value="img">תמונה</option>
                  <option value="hex">צבע</option>
                </Select>
                {productColor.thumbnail[0] === 'hex' ? (
                  <TextInput
                    placeholder="צבע בפורמט HEX"
                    value={productColor.thumbnail[1]}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange(e, 'thumbnail.hex')}
                  />
                ) : isEditing ? (
                  <FileInput
                    onChange={(e) => handleInputChange(e, 'thumbnail.hex')}
                  />
                ) : (
                  <img src={productColor.thumbnail[1]} alt="img thumbnail" />
                )}
              </div>
            </div>
            <div>
              <Label value="תמונות" />
              {isEditing ? (
                <FileDropzone
                  isMany
                  setFiles={(e) => handleInputChange(e, 'images')}
                />
              ) : (
                <div className="flex flex-nowrap overflow-x-auto gap-4 mt-2 max-h-20">
                  {productColor.images.map((image, i) => (
                    <img
                      key={'productColor-img-' + i}
                      src={image}
                      alt={productColor.name}
                      className="h-20 w-20 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-x-5">
              <div>
                <Label value="מחיר" />
                <TextInput
                  placeholder="מחיר"
                  type="number"
                  rightIcon={() => '₪'}
                  value={productColor.price}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange(e, 'price')}
                />
              </div>
              <div>
                <Label value="מחיר לפני הנחה" />
                <TextInput
                  placeholder="מחיר לפני הנחה"
                  type="number"
                  rightIcon={() => '₪'}
                  value={productColor.priceBeforeDiscount || productColor.price}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange(e, 'priceBeforeDiscount')}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <Table.Head className="text-center">
                  <Table.HeadCell>מידה</Table.HeadCell>
                  {Array.from({ length: 23 }, (_, i) => 27 + i).map((size) => (
                    <Table.HeadCell key={'size-' + size}>{size}</Table.HeadCell>
                  ))}
                </Table.Head>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>מלאי</Table.Cell>
                    {Array.from({ length: 23 }, (_, i) => 27 + i).map((size) => (
                      <Table.Cell key={'stock-' + size}>
                        <TextInput
                          className="w-14"
                          type="number"
                          value={productColor.sizes[size] || ''}
                          disabled={!isEditing}
                          onChange={(e) => handleInputChange(e, 'sizes', size)}
                        />
                      </Table.Cell>
                    ))}
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
          {isError && <p className="rtl m-4 text-sm text-red-500">{isError}</p>}
        </Modal.Body>
        <Modal.Footer className="bg-white border-t border-gray-200">
          {isEditing ? (
            <Button
              onClick={handleSubmit}
              isProcessing={isLoading}
              className="text-white bg-emerald-500 hover:bg-emerald-600"
            >
              שמור
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="text-white bg-emerald-500 hover:bg-emerald-600"
            >
              ערוך
            </Button>
          )}
          <Button
            onClick={handleClose}
            color="gray"
            className="text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            בטל
          </Button>
        </Modal.Footer>
      </Modal>
    );
}
