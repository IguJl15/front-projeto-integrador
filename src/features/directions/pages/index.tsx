import { MainBodyLayout } from '@/core/ui/layouts/MainBodyLayout';
import { CreateDirectionModal } from '../components/CreateDirectionModal';

import { httpClient } from '@/core/contexts/AuthContext';
import { useError } from '@/core/contexts/ErrorContext';
import { useEffect, useState } from 'react';
import { DirectionsCardsList } from '../components/DirectionsList/DirectionsCardsList';
import { EmptyDirectionsList } from '../components/DirectionsList/EmptyDirectionsList';
import { DirectionRepository } from '../data/DirectionRepository';
import { Direction } from '../entities/Direction';

export const DirectionPage = () => {
  const repo = new DirectionRepository(httpClient);
  const [directions, setDirections] = useState<Direction[] | null>(null);
  const { runCatchingFailure } = useError();

  function deleteDirection(id: string) {
    runCatchingFailure(
      async () => {
        await repo.deleteDirection(id);
        setDirections(directions!.splice(directions!.findIndex((dir) => dir.id == id)));
      },
      () => setDirections([])
    );
  }

  useEffect(() => {
    runCatchingFailure(
      async () => {
        const directions = await repo.getAllDirections();

        setDirections(directions);
      },
      () => {
        setDirections([]);
      }
    );
  }, []);

  return (
    <MainBodyLayout title="Direcionamentos" action={<CreateDirectionModal />}>
      {directions != null ? (
        directions?.length == 0 ? (
          <EmptyDirectionsList />
        ) : (
          <DirectionsCardsList delete={deleteDirection} directions={directions} />
        )
      ) : (
        ''
      )}
    </MainBodyLayout>
  );
};
