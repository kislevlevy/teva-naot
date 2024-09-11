// Imports:
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MegaMenu, Navbar } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiAccount, mdiArrowLeft, mdiCartVariant, mdiMagnify } from '@mdi/js';
import { TextInput, ActionIcon } from '@mantine/core';

import { categories, subCategories } from '../utils/config';
import { slugify } from '../utils/slugify';

// Component
export default function Header() {
  const [isCollappsed, setIsCollappsed] = useState(false);
  return (
    <MegaMenu dir="rtl">
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between p-4 ">
        <Navbar.Brand href="/">
          <img alt="Teva Naot" src="/img/logoMain.svg" className="mr-3 h-9" />
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex space-x-1">
          <div className="items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer">
            <Icon path={mdiCartVariant} size={1} color="#6b7280" />
          </div>
          <a
            href="#"
            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
          >
            התחברות
          </a>
          <a
            href="#"
            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-white hover:brightness-[110%] focus:outline-none focus:ring-4 focus:ring-gray-300 bg-[#64b496] dark:text-white  dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
          >
            הרשמה
          </a>
        </div>
        <div className="flex space-x-1">
          <div className="items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden cursor-pointer">
            <Icon path={mdiCartVariant} size={1} color="#6b7280" />
          </div>
          <div className="items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden cursor-pointer">
            <Icon path={mdiAccount} size={1} color="#6b7280" />
          </div>
          <Navbar.Toggle />
        </div>

        <Navbar.Collapse
          theme={{
            base: 'w-full md:block md:w-auto',
            list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:text-sm md:font-medium',
            hidden: {
              on: 'hidden',
              off: '',
            },
          }}
        >
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row">
              {categories.map((category, i) =>
                subCategories[i].length < 1 ? (
                  <MegaMenu.Dropdown key={'category-nav-' + i}>
                    <Link to={`/product/category/${slugify(category)}`}>
                      <div className="mr-5 ml-1 hover:text-[#64b496]">
                        {category}
                      </div>
                    </Link>
                  </MegaMenu.Dropdown>
                ) : (
                  <MegaMenu.Dropdown
                    toggle={
                      <div className="mr-5 ml-1 hover:text-[#64b496]">
                        {category}
                      </div>
                    }
                    key={'category-nav-' + i}
                  >
                    <ul
                      className={`grid ${subCategories[i].length > 5 && 'grid-cols-2'}`}
                    >
                      <div className="space-y-4 p-4">
                        {subCategories[i].map(
                          (subCategory, i) =>
                            i < 5 && (
                              <li key={'sub-category-nav-' + i}>
                                <a
                                  href={`/product/category/${slugify(subCategory)}`}
                                  className="hover:text-primary-600 dark:hover:text-primary-500 hover:text-[#64b496]"
                                >
                                  {subCategory}
                                </a>
                              </li>
                            ),
                        )}
                      </div>
                      {subCategories[i].length > 5 && (
                        <div className="space-y-4 p-4">
                          {subCategories[i].map(
                            (subCategory, i) =>
                              i > 5 && (
                                <li key={'sub-category-nav-' + i}>
                                  <a
                                    href={`/product/category/${slugify(subCategory)}`}
                                    className="hover:text-primary-600 dark:hover:text-primary-500"
                                  >
                                    {subCategory}
                                  </a>
                                </li>
                              ),
                          )}
                        </div>
                      )}
                    </ul>
                  </MegaMenu.Dropdown>
                ),
              )}
            </div>

            <TextInput
              className="mt-2"
              radius="xl"
              size="xs"
              placeholder="חיפוש באתר..."
              rightSectionWidth={42}
              leftSection={<Icon path={mdiMagnify} size={0.75} />}
              rightSection={
                <ActionIcon size={22} radius="xl" color="#64b496">
                  <Icon path={mdiArrowLeft} size={1} />
                </ActionIcon>
              }
            />
          </div>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
