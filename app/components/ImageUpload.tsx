'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { invertImage } from '@/app/utils/imageProcessing'

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleImageUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    try {
      setIsProcessing(true);
      const invertedImageBlob = await invertImage(file);
      
      // 创建下载链接
      const downloadUrl = URL.createObjectURL(invertedImageBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `inverted-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUrlProcess = async () => {
    if (!imageUrl) return;

    try {
      setIsProcessing(true);
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const imageBlob = await response.blob();
      const invertedImageBlob = await invertImage(URL.createObjectURL(imageBlob));
      
      // 创建下载链接
      const downloadUrl = URL.createObjectURL(invertedImageBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `inverted-image.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error processing image URL:', error);
      alert('Failed to process image URL. Please check the URL and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className={`
          relative p-8 rounded-xl
          border-2 border-dashed transition-all duration-200
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
          ${isProcessing ? 'opacity-50 cursor-wait' : 'cursor-pointer'} group
        `}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer?.files[0];
          if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
          }
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-full">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">Drop your image here</p>
            <p className="text-sm text-muted-foreground">
              Supports JPG, PNG, WebP (max 10MB)
            </p>
          </div>
          <input 
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImageUpload(file);
              }
            }}
            disabled={isProcessing}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Input 
          type="url"
          placeholder="Or paste image URL here"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={isProcessing}
        />
        <Button 
          variant="secondary"
          onClick={handleUrlProcess}
          disabled={!imageUrl || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Process'}
        </Button>
      </div>
    </div>
  )
}