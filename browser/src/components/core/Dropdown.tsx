import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";

export interface DropdownItem {
  name: string;
  displayName?: string;
  onClick: () => void;
}

interface Props {
  items: DropdownItem[];
  selectedItemName?: string;
  defaultOption?: string;
  className?: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Dropdown({
  items,
  selectedItemName,
  defaultOption,
  className,
}: Props) {
  return (
    <Menu
      as="div"
      className={`relative inline-block text-left ${
        className ? className : ""
      }`}
    >
      <div>
        <Menu.Button className="input inline-flex justify-center w-full px-4 py-2">
          {selectedItemName || defaultOption || ""}
          <span className="flex-grow" />
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-46 rounded-md dropdown">
          <div className="py-1">
            {items.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    className={classNames(active ? "active" : "")}
                    onClick={item.onClick}
                  >
                    {item.displayName ?? item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
