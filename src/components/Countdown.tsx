import React, { useEffect, useState } from 'react'
import { Card } from './ui/card';

function Countdown({date}: {date: string}) {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });


  useEffect(() => {
    const eventDate = new Date(date).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
              <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-dancing text-4xl font-bold text-foreground mb-4">
            Countdown to Our Special Day
          </h2>
          <p className="text-muted-foreground">
            The moment we've been waiting for is getting closer every second
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-4xl font-bold text-primary mb-2">{countdown.days}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Days</div>
          </Card>
          <Card className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-4xl font-bold text-primary mb-2">{countdown.hours}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Hours</div>
          </Card>
          <Card className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-4xl font-bold text-primary mb-2">{countdown.minutes}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Minutes</div>
          </Card>
          <Card className="text-center p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="text-4xl font-bold text-primary mb-2">{countdown.seconds}</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Seconds</div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Countdown