'use client'

import React, { useEffect, useRef, useState } from 'react'
import users from './utils/users.json'
import Image from 'next/image'

type Props = {}

// The multiselect component allows the user to select multiple users from the dropdown
// The user can also remove the selected users by clicking on the close icon or by pressing backspace key]
// The user can also search for the users in the dropdown

const Multiselect = (props: Props) => {

    // This state is used to store the value of the input field
    const [inputValue, setInputValue] = useState<string>("")
    // This state is used to store the selected users
    const [selectedUsers, setSelectedUsers] = useState<{ name: string, image: string }[]>([])
    // This state is used to show/hide the dropdown
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    // This state is used to highlight the last selected user
    const [highlightUserToRemove, setHighlightUserToRemove] = useState(false)

    // This ref is used to close the dropdown when clicked outside the dropdown
    const dropdownRef = useRef<HTMLDivElement>(null)
    // This ref is used to focus the input field when clicked outside the dropdown
    const inputRef = useRef<HTMLInputElement>(null)

    // This use effect is used to close the dropdown when clicked outside the dropdown
    useEffect(() => {
        // Close dropdown when clicked outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && dropdownRef.current instanceof HTMLElement && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
                setHighlightUserToRemove(false)
            }
        }

        // Add event listener to handle click outside
        document.addEventListener("mousedown", handleClickOutside)
        return () => {

            // Remove event listener on unmount
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // This use effect is used to handle backspace key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // If backspace is pressed and there is no text in the input field then first highlight the last selected user and then remove it on second backspace press
            if (event.key === "Backspace") {
                // If there is no text in the input field then first highlight the last selected user and then remove it on second backspace press
                if (highlightUserToRemove) {
                    setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.name !== selectedUsers[selectedUsers.length - 1].name))
                    setHighlightUserToRemove(false)
                } else {
                    setHighlightUserToRemove(true)
                }
            }
        }
        // Add event listener to handle backspace key press
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            // Remove event listener on unmount
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [highlightUserToRemove])


    return (
        <div onClick={() => {
            // Focus the input field when clicked outside the dropdown
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }} className='border-b border-neutral-200 w-full flex items-center flex-wrap py-2 gap-2 cursor-text'>
            {/* Show the selected users here */}
            {selectedUsers.length > 0 &&
                selectedUsers.map((user, index) => (
                    <div key={user.name} className={`${highlightUserToRemove && index === selectedUsers.length - 1 ? "border-blue-600 bg-blue-600 bg-opacity-10 text-blue-600" : "border-neutral-200 text-neutral-400"} hover:text-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:bg-opacity-10 flex items-center border rounded-full px-3 py-2 cursor-pointer`}>
                        {/* Avatar */}
                        <Image
                            height={25}
                            width={25}
                            className='rounded-full mr-2'
                            src={user.image}
                            alt={user.name}
                        />
                        <p className='text-base font-medium text-neutral-800'>{user.name}</p>
                        {/* Close Icon */}
                        <svg
                            className={` cursor-pointer h-4 w-4 ml-1 text-current`}
                            stroke="currentColor"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                                setHighlightUserToRemove(false)
                                setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.name !== user.name))
                            }}
                        >
                            <g clip-path="url(#clip0_90_2010)">
                                <path d="M18 6L6 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 6L18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_90_2010">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                ))
            }
            <div className='relative min-w-72 max-w-full'>
                {/* Input field */}
                <input
                    ref={inputRef}
                    className='w-full p-2 text-xl outline-none'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder='Search for users'
                    onFocus={() => setShowDropdown(true)}
                />
                {/* Dropdown */}
                {showDropdown &&
                    <div ref={dropdownRef} className='mt-3 bg-white border absolute max-h-48 overflow-y-auto shadow rounded-lg overflow-hidden w-64'>
                        {/* Filter out selected user and map the remaining users to the dropdown */}
                        {users
                            .filter((user) => user.name.toLowerCase().includes(inputValue.toLowerCase())).filter((user) => !selectedUsers.find((selectedUser) => selectedUser.name === user.name))
                            .map((user) => (
                                <div
                                    key={user.name}
                                    className='flex items-center justify-between gap-4 p-4 py-2 hover:bg-neutral-100 cursor-pointer'
                                    onClick={() => {
                                        // Add the selected user to the selected users array
                                        setHighlightUserToRemove(false)
                                        // If the user is already selected then remove it else add it to the selected users array
                                        if (selectedUsers.find((selectedUser) => selectedUser.name === user.name)) {
                                            setSelectedUsers(
                                                selectedUsers.filter((selectedUser) => selectedUser.name !== user.name)
                                            )
                                        } else {
                                            setSelectedUsers([...selectedUsers, user])
                                        }
                                        setInputValue("")
                                    }}
                                >
                                    {/* User details */}
                                    <div className='flex items-center'>
                                        <Image
                                            height={25}
                                            width={25}
                                            className='rounded-full mr-3'
                                            src={user.image}
                                            alt={user.name}
                                        />
                                        <p className='text-base font-medium text-neutral-800'>{user.name}</p>
                                    </div>
                                    <p className='text-xs font-medium text-neutral-400 ml-4 whitespace-nowrap text-ellipsis overflow-hidden'>{user.email}</p>
                                </div>
                            ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default Multiselect