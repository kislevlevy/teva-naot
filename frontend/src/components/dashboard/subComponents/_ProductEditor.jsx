import React, { useEffect, useState } from 'react';

import {
  TextInput,
  Textarea,
  Button,
  Table,
  Select,
  Popover,
  Card,
} from 'flowbite-react';
import { Icon } from '@mdi/react';
import { mdiExitToApp, mdiPencil, mdiTrashCan, mdiWindowClose } from '@mdi/js';

import { useLazyGetProductByIdQuery } from '../../../slices/api/apiProductsSlices';

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
  const [product, setProduct] = useState(initialState);
  const [productColor, setProductColor] = useState();

  const [getProductById, { isSuccess, data }] = useLazyGetProductByIdQuery();

  useEffect(() => {
    selectedProductId === 'new'
      ? setProduct(initialState)
      : getProductById(selectedProductId);
    isSuccess && setProduct(data.data.doc);
  }, [data, selectedProductId]);

  const handleEditClick = () => setIsEditing(!isEditing);

  const handleInputChange = (e, key, i) => {
    switch (key) {
      case 'image':
        setProduct((prev) => ({ ...prev, [key]: e.target.files[0] }));
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

  return (
    <Card className="container mx-auto p-4 rtl">
      <div
        className="hover:text-gray-600 text-gray-500 cursor-pointer"
        onClick={() => setSelectedProductId('')}
      >
        <Icon path={mdiWindowClose} size={1} />
      </div>
      <div className="flex justify-center items-center gap-2 mb-4">
        <div className=" w-60 h-60">
          {isEditing ? (
            <TextInput type="file" onChange={(e) => handleInputChange(e, 'image')} />
          ) : (
            <img className="rounded-lg" src={product.image} alt={product.name} />
          )}
        </div>
        <div className="space-y-2 w-3/4">
          <TextInput
            disabled={!isEditing}
            type="text"
            placeholder="שם"
            value={product.name}
            onChange={(e) => handleInputChange(e, 'name')}
            className="rounded"
          />
          <TextInput
            disabled={!isEditing}
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) => handleInputChange(e, 'price')}
            className="rounded"
          />
          <Textarea
            disabled={!isEditing}
            placeholder="Description"
            value={product.description}
            onChange={(e) => handleInputChange(e, 'description')}
            className="rounded"
          />
          <TextInput
            disabled={!isEditing}
            type="text"
            placeholder="Category"
            value={product.category}
            onChange={(e) => handleInputChange(e, 'category')}
            className="rounded"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-x-1">
        <Button onClick={handleEditClick} gradientDuoTone="cyanToBlue">
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        <Button onClick={handleEditClick} gradientDuoTone="cyanToBlue">
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Thumbnail</Table.HeadCell>
          <Table.HeadCell>Images</Table.HeadCell>
          <Table.HeadCell>Price Before Discount</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Sizes</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {product.colors.map((color, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <TextInput
                  disabled={!isEditing}
                  type="text"
                  value={color.name}
                  onChange={(e) => handleInputChange(e, 'name', index)}
                  className="rounded"
                />
              </Table.Cell>
              <Table.Cell>
                <Select
                  disabled={!isEditing}
                  value={color.thumbnail.type}
                  onChange={(e) => handleInputChange(e, 'thumbnail', index, 'type')}
                >
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                </Select>
                <TextInput
                  disabled={!isEditing}
                  type="text"
                  value={color.thumbnail.value}
                  onChange={(e) => handleInputChange(e, 'thumbnail', index, 'value')}
                  className="rounded mt-2"
                />
              </Table.Cell>
              <Table.Cell>
                <div className="grid grid-cols-2 gap-2">
                  {color.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt="product"
                      className="h-10 w-10 object-cover"
                    />
                  ))}
                  {isEditing && (
                    <TextInput
                      type="file"
                      onChange={(e) => {
                        const newColors = [...product.colors];
                        newColors[index].images.push(
                          URL.createObjectURL(e.target.files[0]),
                        );
                        setProduct({ ...product, colors: newColors });
                      }}
                      className="rounded"
                    />
                  )}
                </div>
              </Table.Cell>
              <Table.Cell>
                <TextInput
                  disabled={!isEditing}
                  type="number"
                  value={color.priceBeforeDiscount}
                  onChange={(e) =>
                    handleInputChange(e, 'priceBeforeDiscount', index)
                  }
                  className="rounded"
                />
              </Table.Cell>
              <Table.Cell>
                <TextInput
                  disabled={!isEditing}
                  type="number"
                  value={color.price}
                  onChange={(e) => handleInputChange(e, 'price', index)}
                  className="rounded"
                />
              </Table.Cell>
              <Table.Cell>
                <Popover
                  content={Object.entries(color.sizes).map(
                    ([size, stock], sizeIndex) => (
                      <div key={sizeIndex}>
                        {size}: {stock}
                      </div>
                    ),
                  )}
                >
                  <Button size="xs">View Sizes</Button>
                </Popover>
              </Table.Cell>
              <Table.Cell>
                <div className="flex space-x-2">
                  <Button
                    size="xs"
                    color="warning"
                    onClick={() => handleEditClick(index)}
                  >
                    <Icon path={mdiPencil} size={0.6} />
                  </Button>
                  <Button
                    size="xs"
                    color="failure"
                    onClick={() => {
                      const newColors = product.colors.filter(
                        (_, colorIndex) => colorIndex !== index,
                      );
                      setProduct({ ...product, colors: newColors });
                    }}
                  >
                    <Icon path={mdiTrashCan} size={0.6} />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
}
