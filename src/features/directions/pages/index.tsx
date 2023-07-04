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
        setDirections(directions!.filter((dir) => dir.id != id));
      },
      () => setDirections([])
    );
  }

  async function fetchDirections(): Promise<void> {
    runCatchingFailure(
      async () => {
        const directions = await repo.getAllDirections();

        setDirections(directions);
      },
      () => {
        setDirections([]);
      }
    );
  }

  function suspendDirection(id: string) {
    runCatchingFailure(async () => {
      await repo.updateDirectionStatus(id, 'suspended');
    });
  }

  useEffect(() => {
    fetchDirections();
    return;
  }, []);

  // Direction Modal Controls
  const [modalOpenned, setModalOpenned] = useState(false);
  const [modalDirection, setModalDirection] = useState<Direction | undefined>();

  function openModal(direction?: Direction) {
    setModalDirection(direction);
    setModalOpenned(true);
  }

  function closeModal() {
    setModalDirection(undefined);
    setModalOpenned(false);
  }

  return (
    <MainBodyLayout
      title="Direcionamentos"
      action={
        <CreateDirectionModal
          direction={modalDirection}
          open={openModal}
          close={closeModal}
          openned={modalOpenned}
          repository={repo}
        />
      }
    >
      {directions != null ? (
        directions?.length == 0 ? (
          <EmptyDirectionsList openModal={openModal} />
        ) : (
          <DirectionsCardsList
            delete={deleteDirection}
            directions={directions}
            suspendDirection={suspendDirection}
            openEdittingModal={openModal}
          />
        )
      ) : (
        ''
      )}
    </MainBodyLayout>
  );
};
