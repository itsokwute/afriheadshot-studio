'use client';

import React from 'react';
import { UploadedPhoto } from '../../lib/types';
import { MultiPhotoUploader } from '../MultiPhotoUploader';

interface BatchUploaderProps {
  photos: UploadedPhoto[];
  onPhotosChange: (photos: UploadedPhoto[]) => void;
  anchorPhotoId: string;
  onAnchorChange: (id: string) => void;
}

export const BatchUploader: React.FC<BatchUploaderProps> = (props) => {
  return <MultiPhotoUploader {...props} />;
};
