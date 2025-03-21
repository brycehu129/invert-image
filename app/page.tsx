'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, Link, Zap, Check, Shield, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import StructuredData from './components/StructuredData';
import Features from './components/Features';
import { invertImage } from './utils/imageProcessing';

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [invertedImage, setInvertedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }

    // 显示原始图片
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setInvertedImage(null);
  };

  const handleUrlProcess = async () => {
    if (!imageUrl) return;

    try {
      setIsProcessing(true);
      
      // 验证 URL 格式
      let validImageUrl = imageUrl;
      
      // 移除 URL 开头的 @ 符号（如果有）
      if (validImageUrl.startsWith('@')) {
        validImageUrl = validImageUrl.substring(1);
      }

      // 验证 URL 格式
      try {
        new URL(validImageUrl);
      } catch {
        throw new Error('Invalid URL format');
      }

      // 使用代理服务获取图片
      const response = await fetch('/api/proxy-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: validImageUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch image');
      }
      
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setSelectedImage(imageUrl);
      setInvertedImage(null);
    } catch (error) {
      console.error('Error loading image URL:', error);
      alert(error instanceof Error ? error.message : 'Failed to load image URL. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInvert = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);
      const invertedBlob = await invertImage(selectedImage);
      const invertedUrl = URL.createObjectURL(invertedBlob);
      setInvertedImage(invertedUrl);
    } catch (error) {
      console.error('Error inverting image:', error);
      alert('Failed to invert image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!invertedImage) return;
    
    const a = document.createElement('a');
    a.href = invertedImage;
    a.download = 'inverted-image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleClear = () => {
    if (selectedImage) URL.revokeObjectURL(selectedImage);
    if (invertedImage) URL.revokeObjectURL(invertedImage);
    setSelectedImage(null);
    setInvertedImage(null);
    setImageUrl('');
  };

  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="w-full py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold text-center mb-6">
              Free Online Image Inverter
            </h1>
            <p className="text-xl text-center text-muted-foreground mb-8">
              Professional image color inversion tool - Instantly create negative effects
            </p>
            
            {/* SEO Description */}
            <div className="prose dark:prose-invert mx-auto mb-12 text-center">
              <p className="text-muted-foreground">
                Transform your photos with our professional image inverter. Create stunning negative effects, 
                enhance scientific imagery, and generate unique artistic visuals - all for free, no registration required.
              </p>
            </div>

            {/* Main Tool Section */}
            <div className="space-y-8">
              {/* Image Preview */}
              {(selectedImage || invertedImage) && (
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedImage && (
                    <div className="space-y-4">
                      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                        <img
                          src={selectedImage}
                          alt="Original image"
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </AspectRatio>
                      <p className="text-center text-sm text-muted-foreground">Original Image</p>
                    </div>
                  )}
                  {invertedImage && (
                    <div className="space-y-4">
                      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                        <img
                          src={invertedImage}
                          alt="Inverted image"
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </AspectRatio>
                      <p className="text-center text-sm text-muted-foreground">Inverted Image</p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {selectedImage && (
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={handleInvert}
                    disabled={isProcessing || !!invertedImage}
                    className="w-40"
                  >
                    {isProcessing ? 'Processing...' : 'Invert Image'}
                  </Button>
                  {invertedImage && (
                    <Button
                      onClick={handleDownload}
                      variant="secondary"
                      className="w-40"
                    >
                      Download
                    </Button>
                  )}
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="w-40"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              )}

              {/* Upload Controls */}
              {!selectedImage && (
                <>
                  <div className="mt-12 max-w-2xl mx-auto">
                    <div 
                      className={`
                        relative p-8 rounded-xl
                        border-2 border-dashed transition-all duration-200
                        ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
                        cursor-pointer group
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
                      <input 
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file);
                          }
                        }}
                      />
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
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="Or paste image URL"
                        className="pl-10"
                        aria-label="Image URL input"
                      />
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                    <Button onClick={handleUrlProcess} disabled={!imageUrl || isProcessing}>
                      Load
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* How It Works Section */}
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-8">How to Invert Image Colors Online</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-card rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Upload Image</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop your image or paste a URL. Supports JPG, PNG, and WebP formats.
                  </p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Click "Invert Image" and watch as colors transform instantly.
                  </p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your inverted image in high quality, ready to use.
                  </p>
                </div>
              </div>
            </section>

            {/* Use Cases Section */}
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-8">Why Use Image Inverter?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-card rounded-lg">
                  <h3 className="font-semibold mb-4">Photography & Art</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Create dramatic negative effects</li>
                    <li>• Enhance artistic compositions</li>
                    <li>• Generate unique visual styles</li>
                  </ul>
                </div>
                <div className="p-6 bg-card rounded-lg">
                  <h3 className="font-semibold mb-4">Scientific & Medical</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Analyze X-ray images</li>
                    <li>• Enhance microscope photos</li>
                    <li>• Improve detail visibility</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="p-6 bg-card rounded-lg">
                  <h3 className="font-semibold mb-2">What is image inversion?</h3>
                  <p className="text-muted-foreground">
                    Image inversion reverses the colors in your image, creating a negative effect. 
                    Light areas become dark, and dark areas become light, while maintaining the image structure.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg">
                  <h3 className="font-semibold mb-2">What file formats are supported?</h3>
                  <p className="text-muted-foreground">
                    Our tool supports all common image formats including JPG, PNG, and WebP. 
                    Maximum file size is 10MB.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-12">
          <Features />
        </section>
      </main>
    </>
  );
}