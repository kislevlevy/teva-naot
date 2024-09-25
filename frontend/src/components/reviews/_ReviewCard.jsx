import React from 'react';
import { Text, Avatar, Group } from '@mantine/core';
import StarComponent from '../product/subComponents/_StarComponent';

const daysToStr = {
  0: 'פורסם היום',
  1: 'פורסם אתמול',
  2: 'פורסם לפני יומיים',
};

export default function ReviewCard({ review }) {
  const days = Math.trunc(
    (Date.now() - new Date(review.createdAt)) / 1000 / 60 / 60 / 24
  );

  return (
    <div className="border-2 border-gray-400 p-2 rounded-md">
      <Group>
        <Avatar
          src={review.user.profileImg}
          alt={review.user.fullName}
          radius="xl"
        />
        <div>
          <Text size="sm">{review.user.fullName}</Text>
          <Text size="xs" c="dimmed">
            {days < 3 ? daysToStr[days] : `פורסם לפני ${days} ימים`}
          </Text>
        </div>
        <StarComponent rating={review.rating} />
      </Group>
      <div className="flex"></div>
      <Text pl={54} pt="sm" size="sm">
        {review.review}
      </Text>
    </div>
  );
}
