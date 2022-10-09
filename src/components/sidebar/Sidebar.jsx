import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';
import logo from '../../assets/Logo.png';
import sidebar_items from '../../assets/JsonData/sidebar_routes.json';
import { AiOutlineClose } from 'react-icons/ai';

const SidebarItem = (props) => {
  const active = props.active ? 'active' : '';

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );

  /**
   * Hook that alerts clicks outside of the passed ref
   */
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.onClose();
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      {props.show ? (
        <div ref={wrapperRef} className="sidebar h-full justify-between">
          <div className="pl-5  overflow-scroll">
            <div className="sidebar__logo">
              <img src={logo} alt="company logo" />
            </div>
            {sidebar_items.map((item, index) => (
              <Link to={item.route} key={index}>
                <SidebarItem
                  title={item.display_name}
                  icon={item.icon}
                  active={index === activeItem}
                />
              </Link>
            ))}
          </div>
          <div
            onClick={props.onClose}
            className="flex bg-[#0000a0] text-gray-50 content-center bottom-0 w-full left-0 p-4 mb-1  hover:bg-blue-800"
          >
            Close <AiOutlineClose color="orange" size={30} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
