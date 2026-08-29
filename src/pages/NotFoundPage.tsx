import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Home } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { BrandLogo } from '../components/common/BrandLogo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-40 pb-28 text-center px-4">
      <div className="max-w-md mx-auto space-y-6 flex flex-col items-center">
        <BrandLogo size="xl" showText={false} />

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
