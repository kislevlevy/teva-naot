// Imports:
import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
  const [query, setQuery] = useState('');

  const currentUser = useSelector((state) => state.userState.user);
  const navigate = useNavigate();
  useEffect(() => {}, [currentUser]);

  const handleSearch = (e) => {
    if (!query) return;
    const func = () => {
      navigate(`/products?q=${query}`);
      setQuery('');
    };
    if (e.type === 'keydown' && e.key === 'Enter') func();
    if (e.type === 'click' && e.target.tagName === 'svg') func();
  };

  return (
    <MegaMenu dir="rtl">
      <CartDrawer {...{ isCartOpen, setIsCartOpen }} />
      <div className="flex flex-wrap items-center justify-between w-full max-w-screen-xl p-4 mx-auto ">
        <Navbar.Brand onClick={() => navigate('/')}>
          <img
            alt="Teva Naot"
            src="/img/logoMain.svg"
            className="h-10 mr-3 cursor-pointer"
          />
        </Navbar.Brand>
        <div className="items-center order-2 hidden md:flex ">
          <div
            onClick={() => setIsCartOpen(true)}
            className="items-center p-2 ml-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <Icon path={mdiCartVariant} size={1} color="#6b7280" />
          </div>
          {currentUser?._id ? (
            <div
              className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => navigate('/profile')}
            >
              <div className="flex flex-col ml-2 text-sm font-bold text-center text-emerald-500">
                {currentUser?.fullName}
              </div>
              <img
                className="rounded-full w-7 h-7"
                src={
                  currentUser?.profileImg
                    ? currentUser?.profileImg
                    : '/img/profileImagePlaceholder.jpg'
                }
                alt={currentUser?.fullName}
              />
            </div>
          ) : (
            <>
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
              <Link
                to="/signup"
                state={{ ...location.state, from: location.pathname }}
              >
                <Button className="w-24 ml-2" gradientDuoTone="greenToBlue">
                  הרשמה
                </Button>
              </Link>
            </>
          )}
        </div>
        <div className="flex space-x-1">
          <div
            onClick={() => setIsCartOpen(true)}
            className="items-center p-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          >
            <Icon path={mdiCartVariant} size={1} color="#6b7280" />
          </div>
          <div
            onClick={() => navigate(currentUser?._id ? '/profile' : '/signup')}
            className="items-center p-2 text-sm text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
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
                      className={`grid ${
                        subCategories[i].length > 5 && 'grid-cols-2'
                      }`}
                    >
                      <div className="p-4 space-y-4">
                        {subCategories[i].map(
                          (subCategory, i) =>
                            i < 5 && (
                              <li key={'sub-category-nav-' + i}>
                                <NavLink
                                  to={`/products/category/${slugify(subCategory)}`}
                                  className="hover:text-primary-600 dark:hover:text-primary-500 hover:text-[#64b496]"
                                >
                                  {subCategory}
                                </NavLink>
                              </li>
                            )
                        )}
                      </div>
                      {subCategories[i].length > 5 && (
                        <div className="p-4 space-y-4">
                          {subCategories[i].map(
                            (subCategory, i) =>
                              i > 5 && (
                                <li key={'sub-category-nav-' + i}>
                                  <NavLink
                                    to={`/products/category/${slugify(subCategory)}`}
                                    className="hover:text-primary-600 dark:hover:text-primary-500"
                                  >
                                    {subCategory}
                                  </NavLink>
                                </li>
                              )
                          )}
                        </div>
                      )}
                    </ul>
                  </MegaMenu.Dropdown>
                )
              )}
            </div>

            <TextInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="mt-2"
              radius="md"
              size="xs"
              placeholder="חיפוש באתר..."
              rightSectionWidth={30}
              leftSection={<Icon path={mdiMagnify} size={0.75} />}
              rightSection={
                <ActionIcon
                  size={22}
                  radius="md"
                  color="#64b496"
                  onClick={handleSearch}
                >
                  <Icon path={mdiArrowLeft} size={0.8} />
                </ActionIcon>
              }
            />
          </div>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
