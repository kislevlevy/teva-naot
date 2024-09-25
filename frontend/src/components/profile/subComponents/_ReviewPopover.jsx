import React, { useState } from 'react';

import { Button, Label, Popover, Textarea, TextInput } from 'flowbite-react';
import Rating from '@mui/material/Rating';
import { useCreateReviewMutation } from '../../../slices/api/apiReviewsSlices';

export default function ReviewPopover({ children, productId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isError, setIsError] = useState('');
  const [createReview] = useCreateReviewMutation();

  const clearFields = () => {
    setRating(0);
    setReview('');
  };

  const handleSubmit = async () => {
    try {
      if (rating < 0.5 || !review) return setIsError('עליך למלא את כל השדות');

      await createReview({ product: productId, review, rating: rating * 2 });
      clearFields();
      setIsError('');
    } catch (_) {
      clearFields();
      return setIsError('כבר פורסם פידבק על המוצר הזה');
    }
  };

  return (
    <Popover
      trigger="hover"
      placement="bottom-start"
      content={
        <div className="p-5 flex flex-col m-2 space-y-2 items-center">
          <Rating
            dir="ltr"
            precision={0.5}
            value={rating}
            onChange={(_, val) => setRating(val)}
          />
          <Label className="w-full text-right" value="ספר מה חשבת על המוצר" />
          <Textarea
            value={review}
            className="resize-none text-md"
            onChange={(e) => setReview(e.target.value)}
            rows={2}
          />
          {isError && (
            <p className="text-xs w-full text-right text-red-500">* {isError}</p>
          )}

          <Button
            onClick={handleSubmit}
            size="xs"
            className="w-full"
            color="success"
          >
            שלח
          </Button>
        </div>
      }
    >
      {children}
    </Popover>
  );
}
