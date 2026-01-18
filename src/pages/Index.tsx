import { Calendar, MapPin, Clock, Shirt, Users, Mail, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedFlower from "../components/AnimatedFlower";
import { useState, useEffect } from "react";
import Countdown from "../components/Countdown";

// Dress code color options
const dressCodeOptions = [
  {
    id: "white-dress",
    name: "White Dress",
    color: "hsl(0 0% 100%)",
    glowColor: "hsl(0 0% 90%)",
    description: "Elegant white dresses for women",
    details: "Full-length or knee-length white dresses. Pair with gold or silver accessories. Heels or elegant flats are acceptable.",
  },
  {
    id: "brown-cap",
    name: "Brown Cap",
    color: "hsl(30 60% 30%)",
    glowColor: "hsl(30 70% 40%)",
    description: "Sophisticated brown headwear for men",
    details: "Brown fedoras, panama hats, or bowler hats. Pair with matching brown shoes and a light-colored suit for a distinguished look.",
  },
  // {
  //   id: "black-shoes",
  //   name: "Black Shoes",
  //   color: "hsl(0 0% 0%)",
  //   glowColor: "hsl(0 0% 20%)",
  //   description: "Classic black footwear",
  //   details: "Polished black shoes - oxfords, loafers, or heels. Ensure they are well-maintained and complement your outfit perfectly.",
  // },
  {
    id: "gold-accent",
    name: "Gold Accent",
    color: "hsl(45 80% 50%)",
    glowColor: "hsl(45 100% 60%)",
    description: "Touch of gold for elegance",
    details: "Gold jewelry, belts, or accessories. A subtle way to add sophistication to your ensemble without overwhelming your outfit.",
  },
];

// Modal Component
const DressCodeModal = ({ 
  option, 
  onClose 
}: { 
  option: typeof dressCodeOptions[0]; 
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-200">
        <Card className="overflow-hidden border-border/50 bg-card/95 backdrop-blur-sm shadow-2xl">
          <div 
            className="h-32 flex items-center justify-center"
            style={{ backgroundColor: option.glowColor }}
          >
            <div 
              className="w-24 h-24 rounded-full shadow-lg border-4 border-white/30"
              style={{ backgroundColor: option.color }}
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-dancing text-2xl font-bold">{option.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
            <p className="text-foreground leading-relaxed">{option.details}</p>
            
            <div className="mt-6 flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border-2 border-border"
                style={{ backgroundColor: option.color }}
              />
              <span className="text-sm text-muted-foreground">
                Color: {option.color}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// RSVP Form Component
const RSVPForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "yes",
    dietary: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center bg-card/95 backdrop-blur-sm border-border/50">
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-dancing text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your RSVP has been received. We look forward to celebrating with you!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Enter your email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="guests" className="text-sm font-medium">Number of Guests *</label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Will you be attending? *</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={formData.attending === "yes"}
              onChange={handleChange}
              className="w-4 h-4 text-primary border-input focus:ring-primary"
            />
            <span className="text-sm">Yes, I'll be there</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="attending"
              value="no"
              checked={formData.attending === "no"}
              onChange={handleChange}
              className="w-4 h-4 text-primary border-input focus:ring-primary"
            />
            <span className="text-sm">Sorry, can't make it</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="dietary" className="text-sm font-medium">Dietary Restrictions</label>
        <textarea
          id="dietary"
          name="dietary"
          value={formData.dietary}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          placeholder="Any dietary requirements or allergies?"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1 gap-2">
          <Mail className="h-4 w-4" />
          Submit RSVP
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const Index = () => {
  const [selectedColor, setSelectedColor] = useState<typeof dressCodeOptions[0] | null>(null);
  const [showRSVPForm, setShowRSVPForm] = useState(false);

  // Sample event data - this can be dynamic later
  const eventData = {
    title: "Olamilekan & Olabisi",
    subtitle: "A celebration of unity and love",
    date: "Saturday, February 15, 2026",
    time: "10:00 AM - 03:00 PM",
    venue: "The Grand Ballroom",
    address: "12, ore ofe street, Ikotun, Lagos, Nigeria",
    host: "Adewale and Olayinka",
    description:
      "Join us for our memorable celebration of love, where two hearts become one. We would be honored to have you celebrate this special moment with us.",
    eventDate: '2026-02-15T19:00:00',
  };

  const addToCalendar = () => {
    const eventTitle = eventData.title;
    const startDate = new Date('2026-02-15T19:00:00');
    const endDate = new Date('2026-02-15T23:00:00');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wedding-event.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      
      {/* Modal */}
      {selectedColor && (
        <DressCodeModal option={selectedColor} onClose={() => setSelectedColor(null)} />
      )}
      
      {/* RSVP Modal */}
      {showRSVPForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowRSVPForm(false)}
          />
          <div className="relative z-50 w-full max-w-lg animate-in fade-in-0 zoom-in-95 duration-200">
            <Card className="bg-card/95 backdrop-blur-sm shadow-2xl border-border/50">
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-dancing text-2xl font-bold">RSVP</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowRSVPForm(false)}
                    className="h-8 w-8 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Please respond before Feb 1, 2026</p>
              </div>
              <div className="p-6">
                <RSVPForm onClose={() => setShowRSVPForm(false)} />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
        
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="font-sans mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            You're Invited to our Nikkah
          </p>
          <h1 className="mb-6 font-dancing text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            {eventData.title}
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground md:text-xl">
            {eventData.subtitle}
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-primary">
            <div className="h-px w-12 bg-primary/50" />
            <span className="text-sm font-medium tracking-wider">THE FAMILY OF</span>
            <div className="h-px w-12 bg-primary/50" />
          </div>
          <p className="mt-2 font-frederick font-bold text-xl uppercase text-foreground">{eventData.host}</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Date & Time Card */}
          <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:shadow-lg">
            <AnimatedFlower />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Date
              </h3>
              <p className="text-xl font-semibold text-foreground">{eventData.date}</p>
              
              <div className="mt-6 flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <p className="text-lg text-foreground">{eventData.time}</p>
              </div>
            </div>
          </Card>

          {/* Venue Card */}
          <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:shadow-lg">
            <AnimatedFlower />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Venue
              </h3>
              <p className="text-xl font-semibold text-foreground">{eventData.venue}</p>
              <p className="mt-2 text-muted-foreground">{eventData.address}</p>
            </div>
          </Card>

          {/* Interactive Dress Code Card */}
          <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:shadow-lg md:col-span-2">
            <AnimatedFlower />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shirt className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Dress Code
              </h3>
              
              {/* Interactive Color Swatches */}
              <div className="flex flex-wrap gap-4">
                {dressCodeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedColor(option)}
                    className="group relative"
                    aria-label={`View ${option.name} details`}
                  >
                    <div 
                      className="relative h-16 w-16 rounded-full border-4 border-border shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl"
                      style={{ 
                        backgroundColor: option.color,
                        boxShadow: `0 0 20px ${option.glowColor}`,
                      }}
                    />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      {option.name}
                    </div>
                  </button>
                ))}
              </div>
              
              <p className="mt-8 text-sm text-muted-foreground">
                Click on any color above to view detailed dress code information
              </p>
            </div>
          </Card>

          {/* RSVP Card */}
          <Card 
            className="group relative overflow-hidden border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:shadow-lg cursor-pointer"
            onClick={() => setShowRSVPForm(true)}
          >
            <AnimatedFlower />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                RSVP
              </h3>
              <p className="text-lg text-muted-foreground">Please respond before Feb 1, 2026</p>
              <p className="mt-2 text-sm text-primary font-medium group-hover:underline">
                Click to respond →
              </p>
            </div>
          </Card>

          {/* Contact Card */}
          <Card className="group relative overflow-hidden border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:shadow-lg">
            <AnimatedFlower />
            <div className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Contact
              </h3>
              <p className="text-lg text-foreground">Adewale Family</p>
              <p className="mt-2 text-muted-foreground">olayinka@adewale.com</p>
            </div>
          </Card>
        </div>

        {/* Description */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {eventData.description}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="min-w-[200px] gap-2"
            onClick={() => setShowRSVPForm(true)}
          >
            <Mail className="h-5 w-5" />
            RSVP Now
          </Button>
          <Button variant="outline" size="lg" className="min-w-[200px]" onClick={addToCalendar}>
            Add to Calendar
          </Button>
        </div>
      </div>

      <Countdown date={eventData.eventDate} />

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          We look forward to celebrating with you ✨
        </p>
      </footer>
    </div>
  );
};

export default Index;

