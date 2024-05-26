import React from 'react';
import NoData from '../common/NoData';

interface ListingsTableProps {
    listings: any[];
}

const ListingsTable: React.FC<ListingsTableProps> = ({ listings }) => {
    if (listings.length === 0) {
        return <NoData />
    }

    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beds</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baths</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sqft</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.beds}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.baths}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{listing.sqft}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListingsTable;
