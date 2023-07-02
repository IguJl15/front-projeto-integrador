import { MainBodyLayout } from '@/core/ui/layouts/MainBodyLayout';
import { CreateDirectionModal } from '../components/CreateDirectionModal';

export const DirectionPage = () => {
  return (
    <MainBodyLayout title="Direcionamentos" action={<CreateDirectionModal />}>
      <div>Content</div>
    </MainBodyLayout>
  );
};
