import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Home } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-40 pb-28 text-center px-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-cream-200 text-terracotta-500 mx-auto flex items-center justify-center shadow-warm-sm border border-cream-300">
          <PawPrint className="w-10 h-10 animate-bounce" />
        </div>

        <Badge variant="terracotta" size="md">
          Page Not Found
        </Badge>

        <h1 className="text-4xl font-black text-chocolate-900">
          Oops! This Paw-th is Missing.
        </h1>

        <p className="text-sm text-chocolate-700/80 leading-relaxed">
          Looks like our curious puppies ran off with this page! Let’s get you back to the main lobby.
        </p>

        <div className="pt-4 flex justify-center gap-3">
          <Link to="/">
            <Button variant="terracotta" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
