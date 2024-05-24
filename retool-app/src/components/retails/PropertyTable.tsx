import React from 'react';

interface Property {
  price: string;
  address: string;
  beds: string;
  baths: string;
  sqft: string;
  image_url: string;
}

interface PropertyTableProps {
  properties: Property[];
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Beds</th>
            <th className="px-4 py-2">Baths</th>
            <th className="px-4 py-2">Sqft</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index} className="bg-gray-100">
              <td className="border px-4 py-2">
                <img src={property.image_url} alt="property" className="w-20 h-20 object-cover"/>
              </td>
              <td className="border px-4 py-2">{property.price}</td>
              <td className="border px-4 py-2">{property.address}</td>
              <td className="border px-4 py-2">{property.beds}</td>
              <td className="border px-4 py-2">{property.baths}</td>
              <td className="border px-4 py-2">{property.sqft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
