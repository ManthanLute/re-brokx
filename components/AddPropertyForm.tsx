tsx
import React, { useState } from 'react';
import {


  Input,
  Label,
  Select,
  Button
} from './ui';

interface AddPropertyFormData {
  propertyName: string;
  propertyLocation: string;
  googleMapsLink: string;
  bhk: string;
  sqFt: string;
  floorNo: string;
  parkingSpaces: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  images: File[];
}

const AddPropertyForm: React.FC<{ setIsOpen: (open: boolean) => void }> = ({ setIsOpen }) => {

  const [formData, setFormData] = useState<AddPropertyFormData>({
    propertyName: '',
    propertyLocation: '',
    googleMapsLink: '',
    bhk: '',
    sqFt: '',
    floorNo: '',
    parkingSpaces: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'apartment',
    images: [],
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData((prevData) => ({
        ...prevData,
        images: Array.from(event.target.files),
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="propertyName">Property Name</Label>
        <Input
          type="text"
          id="propertyName"
          name="propertyName"
          value={formData.propertyName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="propertyLocation">Property Location</Label>
        <Input
          type="text"
          id="propertyLocation"
          name="propertyLocation"
          value={formData.propertyLocation}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="googleMapsLink">Google Maps Link</Label>
        <Input
          type="text"
          id="googleMapsLink"
          name="googleMapsLink"
          value={formData.googleMapsLink}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="bhk">BHK</Label>
        <Input
          type="text"
          id="bhk"
          name="bhk"
          value={formData.bhk}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="sqFt">Sq Ft</Label>
        <Input
          type="text"
          id="sqFt"
          name="sqFt"
          value={formData.sqFt}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="floorNo">Floor No</Label>
        <Input
          type="text"
          id="floorNo"
          name="floorNo"
          value={formData.floorNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="parkingSpaces">No of Parking</Label>
        <Input
          type="text"
          id="parkingSpaces"
          name="parkingSpaces"
          value={formData.parkingSpaces}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="bedrooms">No of Bedrooms</Label>
        <Input
          type="text"
          id="bedrooms"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="bathrooms">No of Bathrooms</Label>
        <Input
          type="text"
          id="bathrooms"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="propertyType">Property Type</Label>
        <Select
          id="propertyType"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
        >
          <option value="apartment">Apartment</option>
          <option value="flat">Flat</option>
          <option value="house">House</option>
          <option value="bungalow">Bungalow</option>
          <option value="township">Township</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="images">Images</Label>
        <Input
          type="file"
          id="images"
          name="images"
          multiple
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AddPropertyForm;