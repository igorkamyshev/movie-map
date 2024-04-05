import { AppShell, Burger, Grid, Stack, Title, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
  YearFilter,
  AutoChange,
  AwardFilter,
  WinningFilter,
} from "./features/filters";
import { Heatmap } from "./features/heatmap";
import { InfoButton, InfoModal } from "./features/info";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={1}>Кино</Title>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Stack justify="space-between" h="100%">
            <Stack>
              <WinningFilter />
              <Title order={2}>Премии</Title>
              <AwardFilter />
            </Stack>
            <InfoButton />
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <Heatmap />
          <Grid>
            <Grid.Col span="content">
              <AutoChange />
            </Grid.Col>
            <Grid.Col span="auto">
              <YearFilter />
            </Grid.Col>
          </Grid>
        </AppShell.Main>
      </AppShell>
      <InfoModal />
    </>
  );
}

export default App;
