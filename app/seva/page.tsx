"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Heart, 
  Users, 
  ShieldCheck, 
  Trophy, 
  Star, 
  Gift,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GitaDaanPage() {
  const [gitasDonated, setGitasDonated] = useState(1250);
  const [donationProgress, setDonationProgress] = useState(65);

  // Animated counter for donated Gitas
  useEffect(() => {
    const interval = setInterval(() => {
      if (gitasDonated < 1500) {
        setGitasDonated(prev => prev + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [gitasDonated]);

  const distributionTargets = [
    { label: "School Children", count: 500, icon: "👦" },
    { label: "Prison Inmates", count: 300, icon: "🏛️" },
    { label: "Hospitals", count: 250, icon: "🏥" },
    { label: "Libraries", count: 200, icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* Hero Section with Parallax Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full blur-xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto pt-12 px-5">
          {/* Header with Badge */}
          <div className="text-center mb-8">
            <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Gita Jayanti Special Initiative
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Bhagavad Gita <span className="text-orange-600">Dāna</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Distributing Divine Wisdom to Transform Lives
            </p>
          </div>

          {/* Hero Banner */}
          <div className="relative max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <Image
              src="/images/gitadaan.png"
              alt="Bhagavad Gita Daan Banner"
              width={1200}
              height={600}
              className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      <span className="text-orange-600">{gitasDonated}+</span> Gitas Distributed
                    </h3>
                    <p className="text-gray-600">Transforming lives through spiritual wisdom</p>
                  </div>
                </div>
                <Progress value={donationProgress} className="h-2 bg-gray-200">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                </Progress>
                <p className="text-sm text-gray-600 mt-2">{donationProgress}% towards our monthly goal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 pb-20">
        {/* Sloka Section with Animation */}
        <div className="mb-12 transform hover:scale-[1.02] transition-transform duration-300">
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-orange-50 to-amber-50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
            <CardContent className="p-8 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Divine Promise
                </h2>
              </div>
              <div className="bg-white/70 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-orange-700 mb-6 text-center">
                  Bhagavad-gītā 18.68–69
                </h3>
                <blockquote className="text-center">
                  <p className="italic text-2xl text-gray-800 leading-relaxed mb-6">
                    "For one who explains this supreme secret to the devotees,  
                    pure devotional service is guaranteed, and at the end he will 
                    return to Me."
                  </p>
                  <p className="text-xl font-semibold text-orange-600">
                    There is no servant more dear to Me than he
                  </p>
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Targets */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Our Distribution <span className="text-orange-600">Targets</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {distributionTargets.map((target, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{target.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{target.label}</h3>
                  <div className="text-3xl font-bold text-orange-600 mb-2">{target.count}</div>
                  <p className="text-gray-600">Gitas Target</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="story" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-orange-50 to-amber-50 p-1 rounded-2xl">
            <TabsTrigger value="story" className="rounded-xl data-[state=active]:bg-white">
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </TabsTrigger>
            <TabsTrigger value="why" className="rounded-xl data-[state=active]:bg-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Why Gita Daan
            </TabsTrigger>
            <TabsTrigger value="benefits" className="rounded-xl data-[state=active]:bg-white">
              <Trophy className="w-4 h-4 mr-2" />
              Donor Benefits
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="story">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-orange-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Continuing a Sacred Legacy</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      This seva is inspired by the divine service of my father and uncle 
                      at the Tirupati Tiruchanur Padmavati Ammavari Temple Trust.  
                      Carrying forward their legacy, I dedicate myself to spreading spiritual wisdom.
                    </p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-xl p-6">
                  <p className="text-gray-800 leading-relaxed">
                    My life was profoundly transformed by the teachings of <strong>Srila Prabhupada</strong>, 
                    who ignited in me the passion to distribute the Bhagavad Gita to everyone, 
                    especially children. During this sacred <strong>Gita Jayanti month (December–January)</strong>, 
                    I feel blessed to participate in spreading Lord Krishna's eternal message.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="why">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Bhagavad Gita Dāna?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: "👦", title: "For Children", desc: "Gain life values, discipline, and clarity from young age" },
                    { icon: "🏛️", title: "For Prison Inmates", desc: "Receive hope, guidance, and spiritual transformation" },
                    { icon: "💖", title: "Character Building", desc: "Develops strong moral character and peaceful thinking" },
                    { icon: "📖", title: "Lifelong Guide", desc: "Gita becomes a constant companion and spiritual guide" },
                    { icon: "🌍", title: "Social Impact", desc: "Spreads spiritual wisdom where it's needed most" },
                    { icon: "🕊️", title: "Peace & Harmony", desc: "Promotes inner peace and social harmony" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="benefits">
            <Card className="border-0 shadow-xl bg-gradient-to-b from-white to-amber-50 border-l-4 border-orange-500">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Divine Blessings for Donors</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Direct blessings of Lord Krishna (Gita 18.68–69)",
                    "Immense spiritual merit (punya) for distributing divine knowledge",
                    "Inner peace and long-term spiritual benefit",
                    "Blessings for donor's family and future generations",
                    "Good fortune and protection through devotional service",
                    "Special sukriti (spiritual credit) that stays with soul forever",
                    "Service to Srila Prabhupada's mission of Gita distribution",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Donation Section */}
        <Card className="shadow-2xl border-0 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 mb-12 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 rounded-full opacity-10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-300 rounded-full opacity-10"></div>
          
          <CardContent className="p-8 relative">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full mb-6">
                <Star className="w-5 h-5" />
                <span className="text-lg font-semibold">Make a Divine Contribution</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Donate Bhagavad Gita Today
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Sponsor Gitas for Schools, Prisons, Hospitals, or anyone you wish to bless
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* QR Code Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                  <h3 className="text-xl font-semibold">100% Secure Donation</h3>
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-white rounded-2xl p-6 border-2 border-orange-200">
                    <Image
                      src="/images/qrcode.jpeg"
                      alt="Donation QR Code"
                      width={250}
                      height={250}
                      className="mx-auto rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-700 mb-2">Scan QR Code or use UPI ID:</p>
                  <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-3 rounded-lg">
                    <span className="font-mono text-lg font-bold text-orange-700">
                      harikrishnanaeilu-1@okaxis
                    </span>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              {/* Donation Options */}
              <div>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">Choose Your Impact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { amount: "₹108", gitas: "1 Gita", desc: "Bless one person" },
                      { amount: "₹540", gitas: "5 Gitas", desc: "Bless a family" },
                      { amount: "₹1080", gitas: "10 Gitas", desc: "Bless a classroom" },
                      { amount: "Custom", gitas: "Any Amount", desc: "Any quantity" },
                    ].map((option, index) => (
                      <Button key={index} variant="outline" className="h-auto py-4 hover:border-orange-300 hover:bg-orange-50">
                        <div className="text-center">
                          <div className="text-xl font-bold text-orange-600">{option.amount}</div>
                          <div className="text-sm font-medium">{option.gitas}</div>
                          <div className="text-xs text-gray-600 mt-1">{option.desc}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Link href="https://pages.razorpay.com/pl_RqBOG3p8bacxPn/view" target="_blank" className="flex items-center justify-center gap-2">
                    Donate via Razorpay
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transparency & Contact */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Transparency */}
          <Card className="border-0 shadow-lg bg-gradient-to-b from-white to-green-50 border-t-4 border-green-400">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-900">Complete Transparency</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>100% of donation used for Gita books</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Zero administrative charges</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Distribution photos/videos shared with donors</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Monthly impact reports</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg bg-gradient-to-b from-white to-blue-50 border-t-4 border-blue-400">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-900">Get In Touch</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Harikrishnan</h4>
                    <p className="text-sm text-gray-600">Seva Coordinator</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium w-20">Mobile:</span>
                    <span className="text-blue-600 font-semibold">+91-8970853557</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium w-20">Email:</span>
                    <span className="text-blue-600 font-semibold">harikrishananaeilu.v@gmail.com</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center">
          <div className="mb-4">
            <Badge variant="outline" className="px-4 py-2 border-orange-300 text-orange-600">
              🙏 Hare Krishna
            </Badge>
          </div>
          <p className="text-gray-600 mb-2">
            © 2025 Rishab Informatica Group — Seva Initiative
          </p>
          <p className="text-sm text-gray-500">
            Serving humanity through spiritual knowledge distribution
          </p>
        </footer>
      </div>
    </div>
  );
}