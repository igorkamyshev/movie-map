import { AppShell, Burger, Grid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { YearFilter, AutoChange } from "./features/filters";
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
        <div>Тут будет пояснение</div>
      </AppShell.Header>
      <AppShell.Navbar p="md">Тут будут фильмы</AppShell.Navbar>
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
