'use client';

import { Upload, Image as ImageIcon, ArrowRight, Check, Link, Zap, Plus, Shield, Lock, Download } from 'lucide-react';
import { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="w-full py-20 bg-grid-small-black/[0.02] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 mb-6">
              Free Online Image Inverter
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Instantly invert your images with our professional-grade tool. Transform colors, create negative effects, and enhance your photos in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 -mt-12 relative z-10">
        {/* Upload Card */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-lg backdrop-blur-sm overflow-hidden max-w-4xl mx-auto">
          <div className="p-8">
            {/* Upload Area */}
            <div 
              className={`
                relative p-10 rounded-xl
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
                // Handle drop
              }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-medium mb-2">
                    Drop your image here or{' '}
                    <span className="text-primary hover:underline cursor-pointer">browse files</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports: JPG, PNG, WebP (Max 10MB)
                  </p>
                </div>
              </div>
            </div>

            {/* URL Input */}
            <div className="mt-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste image URL"
                    className="pl-10"
                  />
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <Button className="px-8">
                  Invert
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-4 gap-px bg-border/50">
            {[
              { icon: <Zap className="w-5 h-5" />, text: "Instant Processing" },
              { icon: <Check className="w-5 h-5" />, text: "100% Free" },
              { icon: <ImageIcon className="w-5 h-5" />, text: "High Quality" },
              { icon: <Shield className="w-5 h-5" />, text: "Secure Upload" },
            ].map((feature, i) => (
              <div key={i} className="bg-card p-4 flex items-center justify-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              How to Invert Images Online
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Upload Image",
                  desc: "Drop your image or paste a URL",
                  icon: <Upload className="w-6 h-6" />
                },
                {
                  step: "02",
                  title: "Instant Processing",
                  desc: "Our system processes your image instantly",
                  icon: <Zap className="w-6 h-6" />
                },
                {
                  step: "03",
                  title: "Download Result",
                  desc: "Get your inverted image in high quality",
                  icon: <Download className="w-6 h-6" />
                }
              ].map((item, i) => (
                <div key={i} className="group relative">
                  <div className="
                    bg-card rounded-xl p-6
                    border border-border/50
                    hover:border-primary/50 hover:shadow-md
                    transition-all duration-200
                  ">
                    {/* Step Number */}
                    <div className="
                      absolute -top-3 left-6
                      px-3 py-1
                      bg-background
                      border border-border/50
                      rounded-full
                      text-sm font-medium
                      group-hover:border-primary/50
                      transition-colors
                    ">
                      Step {item.step}
                    </div>

                    {/* Icon */}
                    <div className="
                      w-12 h-12
                      rounded-lg
                      bg-primary/10
                      flex items-center justify-center
                      mb-4 mt-2
                      text-primary
                      group-hover:bg-primary/20
                      transition-colors
                    ">
                      {item.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>

                  {/* Connector Line (hide on last item and mobile) */}
                  {i < 2 && (
                    <div className="
                      hidden md:block
                      absolute top-1/2 -right-3
                      w-6 h-px
                      bg-border
                      group-hover:bg-primary/50
                      transition-colors
                    "/>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-card rounded-2xl border border-border/50 p-8">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">What is Image Inversion?</h2>
              <p>
                Image inversion is a powerful photo editing technique that reverses the colors of an image, creating a negative effect. 
                This process transforms light areas to dark and dark areas to light, while maintaining the overall structure and detail of the original image.
              </p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Benefits of Using Our Image Inverter</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Professional results with instant processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>No registration or software installation required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Supports all common image formats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Free to use with no watermarks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}