import { useUnit } from "effector-react";
import { Modal, Text, Stack, Accordion, Alert } from "@mantine/core";

import { $opened, close } from "./modal.model";
import { PropsWithChildren } from "react";

export function InfoModal() {
  const { opened, onClose } = useUnit({ opened: $opened, onClose: close });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title="Что у вас здесь происходит?"
    >
      <Stack>
        <Text>
          Это интерактивное отображение победителей и номинантов кинопремий на
          карте. Чем больше фильмов из региона было наминировано (или победило)
          на кинопремию — тем теменее регион окрашен на карте. Включайте
          фильтры, двигайте таймлайн, исследуйте данные.
        </Text>
        <Alert>
          Предложения, замечания и благодарности можно писать в телеграм —{" "}
          <Link href="https://t.me/igorkamyshev">@igorkamyshev</Link>.
        </Alert>
        <Text>
          Карта построена по данным{" "}
          <Link href="https://kinopoisk.dev/">https://kinopoisk.dev/</Link> на 5
          апреля 2024 года. Спасибо администрации за предоставленные данные 💙
        </Text>
        <Accordion multiple>
          <Accordion.Item value="awards">
            <Accordion.Control icon={"🏆"}>
              Почему именно эти премии?
            </Accordion.Control>
            <Accordion.Panel>
              В исходных данных есть только этим премии. Добавить другие сложно,
              исключать существующие — не понятно зачем.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="find">
            <Accordion.Control icon={"🔍"}>
              А какие именно фильмы выиграли премию Х?
            </Accordion.Control>
            <Accordion.Panel>
              Мы тут только карту рисуем и данные показываем. Подробности о
              фильмах лучше смотреть на{" "}
              <Link href="https://www.kinopoisk.ru/">Кинопоиске</Link>.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="code">
            <Accordion.Control icon={"🧑‍💻"}>
              Хочу посмотреть исходный код. Можно?
            </Accordion.Control>
            <Accordion.Panel>
              Да, исходный код сайта и скриптов агрегации данных открыт —{" "}
              <Link href="https://github.com/igorkamyshev/movie-map">
                https://github.com/igorkamyshev/movie-map
              </Link>
              . К сожалению, исходные данные мы открыть не можем, их нужно
              запросить на{" "}
              <Link href="https://kinopoisk.dev/">https://kinopoisk.dev/</Link>.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="map">
            <Accordion.Control icon={"🗺️"}>
              Какая-то странная карта у вас 🧐
            </Accordion.Control>
            <Accordion.Panel>
              Для отображения карты и всех её элементов используется библиотека{" "}
              <Link href="https://datamaps.github.io/">DataMaps</Link>. Мы её не
              контролируем и изменить ничего не можем. Если вам грустно из-за
              отдельный элементов карты — не грустите.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Modal>
  );
}

function Link({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
