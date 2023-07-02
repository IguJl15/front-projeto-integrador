import { MainBodyLayout } from '@/core/ui/layouts/MainBodyLayout';
import { CreateDirectionModal } from '../components/CreateDirectionModal';

import { httpClient } from '@/core/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { DirectionsCardsList } from '../components/DirectionsList/DirectionsCardsList';
import { EmptyDirectionsList } from '../components/DirectionsList/EmptyDirectionsList';
import { DirectionRepository } from '../data/DirectionRepository';
import { Direction } from '../entities/Direction';
import { useError } from '@/core/contexts/ErrorContext';
import Failure from '@/core/error/Failure';

export const DirectionPage = () => {
  const repo = new DirectionRepository(httpClient);
  const [directions, setDirections] = useState<Direction[]>([]);
  const { showError } = useError();
  
  useEffect(() => {
    try {
      repo.getAllDirections().then((value) => {
        setDirections(value);
      });
    } catch (error) {
      if (error instanceof Failure) {
        showError(error);
      }
    }
  }, []);

  return (
    <MainBodyLayout title="Direcionamentos" action={<CreateDirectionModal />}>
      <div>
        {directions.length == 0 ? (
          <EmptyDirectionsList />
        ) : (
          <DirectionsCardsList directions={directions} />
        )}
      </div>
    </MainBodyLayout>
  );
};
