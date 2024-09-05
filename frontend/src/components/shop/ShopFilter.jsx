import React, { useState } from 'react';

import { Checkbox, Label, Sidebar, TextInput } from 'flowbite-react';
import { InputGroup, Form } from 'react-bootstrap';

export default function ShopFilter() {
  return (
    <Sidebar className="p-3">
      <Sidebar.Items>
        <h3 className="text-right">קטגוריות</h3>
        <Sidebar.ItemGroup className="mb-4">
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">כפכפים</Label>
            <Checkbox />
          </Sidebar.Item>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">כפכפים</Label>
            <Checkbox />
          </Sidebar.Item>
          <Sidebar.Item className="h-[30px] text-right">
            <Label className="mr-2">כפכפים</Label>
            <Checkbox />
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <h3 className="text-right">מחיר</h3>
        <Sidebar.ItemGroup>
          <Sidebar.Item>
            <InputGroup className="w-[100%]">
              <InputGroup.Text>₪</InputGroup.Text>
              <Form.Control placeholder="min" aria-label="min" type="" />
              <Form.Control placeholder="max" aria-label="max" />
            </InputGroup>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
