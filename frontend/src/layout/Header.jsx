// Imports:
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, MegaMenu, Navbar } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiAccount, mdiArrowLeft, mdiCartVariant, mdiMagnify } from '@mdi/js';
import { TextInput, ActionIcon } from '@mantine/core';

import { categories, subCategories } from '../utils/config';
import { slugify } from '../utils/slugify';
import CartDrawer from '../components/cart/CartDrawer';
import LoginPopover from '../components/auth/LoginPopover';

// Component
export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <MegaMenu dir="rtl">
      <CartDrawer {...{ isCartOpen, setIsCartOpen }} />
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between p-4 ">
        <Navbar.Brand href="/">
          <img alt="Teva Naot" src="/img/logoMain.svg" className="mr-3 h-9" />
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex ">
          <div
            onClick={() => setIsCartOpen(true)}
            className="items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer ml-2"
          >
            <Icon path={mdiCartVariant} size={1} color="#6b7280" />
          </div>
          <LoginPopover {...{ isLoginOpen, setIsLoginOpen }}>
            <Button
              className="w-24 ml-2"
              gradientDuoTone="greenToBlue"
              outline
              onClick={() => setIsLoginOpen((prev) => !!prev)}
            >
              התחברות
            </Button>
          </LoginPopover>
          <Link to="/signup" state={{ ...location.state, from: location.pathname }}>
            <Button className="w-24 ml-2" gradientDuoTone="greenToBlue">
              הרשמה
            </Button>
          </Link>
        </div>
        <div className="flex space-x-1">
          <div
            onClick={() => setIsCartOpen(true)}
            className="items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden cursor-pointer"
          >
            <Icon path={mdiCartVariant} size={1} color="#6b7280" />
          </div>
          <div
            onClick={() =>
              navigate('/signup', { state: { ...state, from: pathname } })
            }
            className="items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden cursor-pointer"
          >
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
                    <Link
                      to={`/products/category/${slugify(category)}`}
                      state={{ ...location.state, from: location.pathname }}
                    >
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
                                  href={`/products/category/${slugify(subCategory)}`}
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
                                    href={`/products/category/${slugify(subCategory)}`}
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
