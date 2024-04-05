import { AppShell, Burger, Grid, Stack, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
  YearFilter,
  AutoChange,
  AwardFilter,
  WinningFilter,
} from "./features/filters";
import { Heatmap } from "./features/heatmap";

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
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
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title order={1}>НАЗВАНИЕ</Title>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack>
          <WinningFilter />
          <Title order={2}>Премии</Title>
          <AwardFilter />
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
  );
}

export default App;
