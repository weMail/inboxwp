import React, {Fragment, useEffect, useState} from '@wordpress/element'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Datepicker from 'react-datepicker'
import moment from "moment/moment";
import "react-datepicker/dist/react-datepicker.css";


const mailStatuses = [
    { id: 'all', title: 'All' },
    { id: 'sent', title: 'Sent' },
    { id: 'queued', title: 'Queued' },
    { id: 'processed', title: 'Processed' },
]

export default function Filter({fetchData}) {

    const [loading, setLoading] = useState(false)

    const [mailStatus, setMailStatus] = useState('all')

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [selectedDate, setSelectedDate] = useState('')

    const handleDateSelection = (name, value) => {
        if (! name) {
            return;
        }
        if (name === 'fromDate') {
            setFromDate(moment(value).format('YYYY-MM-DD'))
        }
        if (name === 'toDate') {
            setToDate(moment(value).format('YYYY-MM-DD'))
        }
    }

    const handleDateType = (event, value) => {
        setSelectedDate(value)
    }

    const generateDates = () => {
        let from = '';
        let to = '';
        switch (selectedDate) {
            case 'today':
                setToDate('')
                setFromDate('')
                from = moment().format('YYYY-MM-DD')
                to = from;
                break;
            case 'yesterday':
                setToDate('')
                setFromDate('')
                from = moment().subtract(1, 'day').format('YYYY-MM-DD')
                to = from;
                break;
            default:
                if (!selectedDate && mailStatus === 'all') {
                    break;
                } else {
                    if (selectedDate !== 'custom') {
                        setToDate('')
                        setFromDate('')
                    }
                    from = moment().subtract(1, 'day').format('YYYY-MM-DD')
                    to = from;
                    break;
                }
        }

        return {from, to}
    }

    useEffect(()=> {
        loadData()
    }, [mailStatus, fromDate, toDate, selectedDate]);

    const loadData = () => {
        const dates = generateDates();
        let from = dates.from;
        let to = dates.to;
        if (selectedDate === 'custom') {
            if (! fromDate || !toDate) {
                return;
            }
        } else {
            if (!from || !to) {
                return;
            }
        }

        const filterData = {
            status: mailStatus,
            from: fromDate || from,
            to: toDate || to,
        };
        fetchData(filterData);
    }

    return (
        <Menu as="div" className="inboxwp-relative inboxwp-inline-block inboxwp-text-left">
            <div>
                <Menu.Button className="inboxwp-inline-flex inboxwp-w-full inboxwp-justify-center inboxwp-gap-x-1.5 inboxwp-rounded-md inboxwp-bg-white inboxwp-px-3 inboxwp-py-2 inboxwp-text-sm inboxwp-font-semibold inboxwp-text-gray-900 inboxwp-shadow-sm inboxwp-ring-1 inboxwp-ring-inset inboxwp-ring-gray-300 hover:inboxwp-bg-gray-50">
                    Filter
                    <ChevronDownIcon className="-inboxwp-mr-1 inboxwp-h-5 inboxwp-w-5 inboxwp-text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="inboxwp-absolute inboxwp-right-0 inboxwp-z-10 inboxwp-mt-2 inboxwp-w-[400px] inboxwp-origin-top-right inboxwp-rounded-md inboxwp-bg-white inboxwp-shadow-lg inboxwp-ring-1 inboxwp-ring-black inboxwp-ring-opacity-5 focus:inboxwp-outline-none">
                    <div className="inboxwp-p-3">
                        {mailStatuses.map((mailStatus) => (
                            <div key={mailStatus.id} className="inboxwp-flex inboxwp-items-center">
                                <input
                                    id={mailStatus.id}
                                    name="notificationMethod"
                                    type="radio"
                                    value={mailStatus.id}
                                    defaultChecked={mailStatus.id === 'all'}
                                    onChange={(event)=>{setMailStatus(event.target.value)}}
                                    className="inboxwp-h-4 inboxwp-w-4 inboxwp-border-gray-300 inboxwp-text-indigo-600 focus:inboxwp-ring-indigo-600"
                                    disabled={loading}
                                />
                                <label htmlFor={mailStatus.id} className="inboxwp-ml-3 inboxwp-block inboxwp-text-sm inboxwp-font-medium inboxwp-leading-6 inboxwp-text-gray-700">
                                    {mailStatus.title}
                                </label>
                            </div>
                        ))}
                    </div>
                    <hr/>
                    <div className="inboxwp-p-3">
                        <label className="inboxwp-block inboxwp-text-sm inboxwp-font-medium inboxwp-leading-6 inboxwp-text-gray-700">
                            Select Date
                        </label>
                        <select
                            id="location"
                            name="dateSelection"
                            className="inboxwp-mt-2 inboxwp-block inboxwp-w-full inboxwp-rounded-md inboxwp-border-0 inboxwp-py-1.5 inboxwp-pl-3 inboxwp-pr-10 inboxwp-text-gray-900 inboxwp-ring-1 inboxwp-ring-inset inboxwp-ring-gray-300 focus:inboxwp-ring-2 focus:inboxwp-ring-indigo-600 sm:inboxwp-text-sm sm:inboxwp-leading-6"
                            value={selectedDate}
                            onChange={(event)=>{handleDateType(event, event.target.value)}}
                            disabled={loading}
                        >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="custom">Custom</option>
                        </select>

                        {selectedDate == 'custom' ? <div className="inboxwp-flex inboxwp-space-x-5 inboxwp-pt-5">
                            <div>
                                <label htmlFor="email" className="inboxwp-block inboxwp-text-sm inboxwp-font-medium inboxwp-leading-6 inboxwp-text-gray-700">
                                    From
                                </label>
                                <div className="inboxwp-mt-2">
                                    <Datepicker
                                        name="fromDate"
                                        value={fromDate}
                                        asSingle={true}
                                        useRange={false}
                                        onChange={(value)=>{handleDateSelection('fromDate', value)}}
                                        displayFormat="DD-MM-YYYY"
                                        placeholderText="DD-MM-YYYY"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="inboxwp-block inboxwp-text-sm inboxwp-font-medium inboxwp-leading-6 inboxwp-text-gray-700">
                                    To
                                </label>
                                <div className="inboxwp-mt-2">
                                    <Datepicker
                                        value={toDate}
                                        name="toDate"
                                        asSingle={true}
                                        useRange={false}
                                        onChange={(value)=>{handleDateSelection('toDate', value)}}
                                        dateFormat="DD-MM-YYYY"
                                        placeholderText="DD-MM-YYYY"
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div> : ''}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

