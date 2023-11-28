import { Box } from '@mui/material';
import { MatxProgressBar, SimpleCard } from 'app/components';
import { Small } from 'app/components/Typography';

const Campaigns = () => {
  return (
    <Box>
      <SimpleCard title="Campaigns">
        <Small color="text.primary">Today</Small>
        <MatxProgressBar value={75} color="primary" text="Google (102k)" />
        <MatxProgressBar value={45} color="primary" text="Twitter (40k)" />
        <MatxProgressBar value={75} color="primary" text="Tensor (80k)" />

        <Small color="text.primary" display="block" pt={4}>
          Yesterday
        </Small>
        <MatxProgressBar value={75} color="primary" text="Google (102k)" />
        <MatxProgressBar value={45} color="primary" text="Twitter (40k)" />
        <MatxProgressBar value={75} color="primary" text="Tensor (80k)" />

        <Small color="text.primary" display="block" pt={4}>
          Yesterday
        </Small>
        <MatxProgressBar value={75} color="primary" text="Google (102k)" />
        <MatxProgressBar value={45} color="primary" text="Twitter (40k)" />
        <MatxProgressBar value={75} color="primary" text="Tensor (80k)" />
      </SimpleCard>
    </Box>
  );
};

export default Campaigns;
