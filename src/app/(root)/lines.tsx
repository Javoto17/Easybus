import { t } from '@/i18n';
import { useQuery } from '@tanstack/react-query';
import { useNavigation, useRouter } from 'expo-router';
import { Card, Spinner } from 'heroui-native';
import React, { useCallback, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { ScreenLayout, Typography, TypographyVariant, TypographyTone } from '@/components/shared';

import { generateClientRepository } from '@/modules/client/infrastructure/ClientRepository';
import { LineSummary } from '@/modules/stops/domain/LineDetail';
import { generateStopRepository } from '@/modules/stops/infrastructure/StopsRepository';
import { generateStorageRepository } from '@/modules/storage/infrastructure/StorageRepository';

const storageRepository = generateStorageRepository();
const clientRepository = generateClientRepository(storageRepository);
const stopRepository = generateStopRepository(
  clientRepository,
  storageRepository
);

const getTodayDateRef = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const LinesScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      title: t('lines.title'),
      headerLargeTitle: false,
    });
  }, [navigation]);

  const {
    data: lines,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['emt-lines'],
    queryFn: () => stopRepository.getLines(getTodayDateRef()),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const onPressLine = useCallback(
    (lineId: string) => {
      router.push(`/line/${lineId}` as never);
    },
    [router]
  );

  const getLineColor = (lineId: string): string => {
    // Líneas nocturnas (N1-N28) - Azul oscuro
    if (/^N\d+$/i.test(lineId)) {
      return '#1A237E';
    }

    // Líneas especiales exprés (E1-E5) - Naranja
    if (/^E\d+$/i.test(lineId)) {
      return '#FF6D00';
    }

    // Líneas universitarias (U1, U2, etc.) - Verde
    if (/^U\d+$/i.test(lineId)) {
      return '#2E7D32';
    }

    // Líneas especiales (H, tipo T, etc.) - Púrpura
    if (/^[HT]\d*$/i.test(lineId)) {
      return '#7B1FA2';
    }

    // Líneas interurbanas (200+) - Gris azulado
    const numLine = parseInt(lineId, 10);
    if (!isNaN(numLine) && numLine >= 200) {
      return '#455A64';
    }

    // Líneas estándar (1-199) - Alternar entre rojo EMT y azul
    if (!isNaN(numLine)) {
      // Líneas circulares o especiales dentro del rango estándar
      if (lineId === 'C1' || lineId === 'C2') {
        return '#00695C'; // Verde oscuro para circulares
      }

      // Alternar colores para líneas estándar
      const lineColors: Record<number, string> = {
        1: '#E60000',
        2: '#0066CC',
        3: '#FFCD00',
        4: '#E60000',
        5: '#0066CC',
        6: '#E60000',
        7: '#0066CC',
        8: '#E60000',
        9: '#0066CC',
        10: '#E60000',
        11: '#0066CC',
        12: '#E60000',
        14: '#0066CC',
        15: '#E60000',
        16: '#0066CC',
        17: '#E60000',
        18: '#0066CC',
        19: '#E60000',
        20: '#0066CC',
        21: '#E60000',
        22: '#0066CC',
        24: '#E60000',
        25: '#0066CC',
        26: '#E60000',
        27: '#0066CC',
        28: '#E60000',
        29: '#0066CC',
        30: '#E60000',
        31: '#0066CC',
        32: '#E60000',
        33: '#0066CC',
        34: '#E60000',
        35: '#0066CC',
        36: '#E60000',
        37: '#0066CC',
        38: '#E60000',
        39: '#0066CC',
        40: '#E60000',
        41: '#0066CC',
        42: '#E60000',
        43: '#0066CC',
        44: '#E60000',
        45: '#0066CC',
        46: '#E60000',
        47: '#0066CC',
        48: '#E60000',
        49: '#0066CC',
        50: '#E60000',
        51: '#0066CC',
        52: '#E60000',
        53: '#0066CC',
        54: '#E60000',
        55: '#0066CC',
        56: '#E60000',
        57: '#0066CC',
        58: '#E60000',
        59: '#0066CC',
        60: '#E60000',
        61: '#0066CC',
        62: '#E60000',
        63: '#0066CC',
        64: '#E60000',
        65: '#0066CC',
        66: '#E60000',
        67: '#0066CC',
        68: '#E60000',
        69: '#0066CC',
        70: '#E60000',
        71: '#0066CC',
        72: '#E60000',
        73: '#0066CC',
        74: '#E60000',
        75: '#0066CC',
        76: '#E60000',
        77: '#0066CC',
        78: '#E60000',
        79: '#0066CC',
        80: '#E60000',
        81: '#0066CC',
        82: '#E60000',
        83: '#0066CC',
        84: '#E60000',
        85: '#0066CC',
        86: '#E60000',
        87: '#0066CC',
        88: '#E60000',
        89: '#0066CC',
        90: '#E60000',
        91: '#0066CC',
        92: '#E60000',
        93: '#0066CC',
        94: '#E60000',
        95: '#0066CC',
        96: '#E60000',
        97: '#0066CC',
        98: '#E60000',
        99: '#0066CC',
        100: '#E60000',
        101: '#0066CC',
        102: '#E60000',
        103: '#0066CC',
        104: '#E60000',
        105: '#0066CC',
        106: '#E60000',
        107: '#0066CC',
        108: '#E60000',
        109: '#0066CC',
        110: '#E60000',
        111: '#0066CC',
        112: '#E60000',
        113: '#0066CC',
        114: '#E60000',
        115: '#0066CC',
        116: '#E60000',
        117: '#0066CC',
        118: '#E60000',
        119: '#0066CC',
        120: '#E60000',
        121: '#0066CC',
        122: '#E60000',
        123: '#0066CC',
        124: '#E60000',
        125: '#0066CC',
        126: '#E60000',
        127: '#0066CC',
        128: '#E60000',
        129: '#0066CC',
        130: '#E60000',
        131: '#0066CC',
        132: '#E60000',
        133: '#0066CC',
        134: '#E60000',
        135: '#0066CC',
        136: '#E60000',
        137: '#0066CC',
        138: '#E60000',
        139: '#0066CC',
        140: '#E60000',
        141: '#0066CC',
        142: '#E60000',
        143: '#0066CC',
        144: '#E60000',
        145: '#0066CC',
        146: '#E60000',
        147: '#0066CC',
        148: '#E60000',
        149: '#0066CC',
        150: '#E60000',
        151: '#0066CC',
        152: '#E60000',
        153: '#0066CC',
        154: '#E60000',
        155: '#0066CC',
        156: '#E60000',
        157: '#0066CC',
        158: '#E60000',
        159: '#0066CC',
        160: '#E60000',
        161: '#0066CC',
        162: '#E60000',
        163: '#0066CC',
        164: '#E60000',
        165: '#0066CC',
        166: '#E60000',
        167: '#0066CC',
        168: '#E60000',
        169: '#0066CC',
        170: '#E60000',
        171: '#0066CC',
        172: '#E60000',
        173: '#0066CC',
        174: '#E60000',
        175: '#0066CC',
        176: '#E60000',
        177: '#0066CC',
        178: '#E60000',
        179: '#0066CC',
        180: '#E60000',
        181: '#0066CC',
        182: '#E60000',
        183: '#0066CC',
        184: '#E60000',
        185: '#0066CC',
        186: '#E60000',
        187: '#0066CC',
        188: '#E60000',
        189: '#0066CC',
        190: '#E60000',
        191: '#0066CC',
        192: '#E60000',
        193: '#0066CC',
        194: '#E60000',
        195: '#0066CC',
        196: '#E60000',
        197: '#0066CC',
        198: '#E60000',
        199: '#0066CC',
      };
      return lineColors[numLine] || (numLine % 2 === 0 ? '#E60000' : '#0066CC');
    }

    // Default para cualquier otro caso
    return '#607D8B';
  };

  const renderLine = ({ item, index }: { item: LineSummary; index: number }) => {
    return (
      <Animated.View entering={FadeInUp.delay(index * 50).duration(300)}>
        <Pressable className="px-5" onPress={() => onPressLine(item.line)}>
          <Card className="bg-surface-container" variant="default">
            <Card.Body className="p-4">
              <View className="flex-row items-center gap-3">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: getLineColor(item.line) }}
                >
                  <Typography variant={TypographyVariant.TitleSm} tone={TypographyTone.Inverse}>
                    {item.line}
                  </Typography>
                </View>
                <View className="flex-1">
                  <Typography variant={TypographyVariant.TitleSm}>{item.label}</Typography>
                  <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted}>
                    {t('line.line')} {item.line}
                  </Typography>
                </View>
              </View>
            </Card.Body>
          </Card>
        </Pressable>
      </Animated.View>
    );
  };

  if (isLoading) {
    return (
      <ScreenLayout variant="scroll">
        <View className="flex-1 items-center justify-center py-20">
          <Spinner size="lg" color="primary" />
          <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mt-4">
            {t('lines.loading')}
          </Typography>
        </View>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout variant="scroll">
        <View className="flex-1 items-center justify-center py-20 px-5">
          <Typography
            variant={TypographyVariant.HeadlineMd}
            tone={TypographyTone.Danger}
            className="text-center"
          >
            {t('lines.errorLoading')}
          </Typography>
          <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mt-2 text-center">
            {t('lines.errorLoadingDescription')}
          </Typography>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      variant="flatlist"
      data={lines || []}
      keyExtractor={(item) => item.line}
      renderItem={renderLine}
      ItemSeparatorComponent={() => <View className="h-3" />}
      ListHeaderComponent={
        <View className="pt-6 pb-4 px-5">
          <Typography variant={TypographyVariant.HeadlineMd}>
            {t('lines.activeLines')}
          </Typography>
          <Typography variant={TypographyVariant.BodyMd} tone={TypographyTone.Muted} className="mt-2">
            {lines?.length || 0} {t('lines.routesAvailable')}
          </Typography>
        </View>
      }
      ListFooterComponent={
        <View className="px-5 pb-safe-offset-6 pt-4 gap-3">
          <Card className="bg-surface-container" variant="default">
            <Card.Body className="p-4">
              <Typography variant={TypographyVariant.TitleSm} className="mb-1">
                {t('lines.nightService')}
              </Typography>
              <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted}>
                {t('lines.nightServiceDescription')}
              </Typography>
            </Card.Body>
          </Card>

          <Card className="bg-surface-container" variant="default">
            <Card.Body className="p-4">
              <Typography variant={TypographyVariant.TitleSm} className="mb-1">
                {t('lines.sustainableTransport')}
              </Typography>
              <Typography variant={TypographyVariant.LabelSm} tone={TypographyTone.Muted}>
                {t('lines.sustainableTransportDescription')}
              </Typography>
            </Card.Body>
          </Card>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

export default LinesScreen;
