

import { CheckCircle, Users, Award } from "lucide-react"


export default function Component() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-[#728f40]" />,
      title: "Student-Focused Community",
      description: "Built by students, for students. We understand your unique needs and challenges in academic life.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#728f40]" />,
      title: "Premium Quality Products",
      description: "Carefully curated accessories that meet the highest standards for durability and functionality.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-[#728f40]" />,
      title: "Affordable Pricing",
      description: "Student-friendly prices with exclusive discounts and flexible payment options for tight budgets.",
    },
  ]

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-[#728f40]">StudyStuff</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're more than just an accessories store – we're your academic success partner, dedicated to providing
            everything you need to excel in your studies.
          </p>
        </div>

        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
           <div
  key={index}
  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-lg p-8 text-center"
>
  <div className="flex justify-center mb-6">
    <div className="p-4 bg-green-50 rounded-full">{feature.icon}</div>
  </div>
  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
</div>

          ))}
        </div>

      
        

       
       
      </div>
    </section>
  )
}

