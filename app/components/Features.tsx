import { 
  Wand2, 
  Microscope, 
  Image as ImageIcon, 
  Share2, 
  Eye 
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Artistic Effects",
      description: "Create unique visual styles and creative effects"
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Scientific Imaging",
      description: "Enhance visibility of details in scientific images"
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "Digital Negatives",
      description: "Convert film negatives into digital positives"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Media",
      description: "Generate engaging content for social platforms"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Accessibility",
      description: "Improve visibility for visually impaired users"
    }
  ]

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <div key={i} className="p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
          <p className="text-muted-foreground">{feature.description}</p>
        </div>
      ))}
    </div>
  )
} 