import { Button, Group, BackgroundImage, Center, Text, Box, Container, Stack, Image, Overlay } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/valo-log.svg'


function Home() {

    const { t } = useTranslation()

    return (
        <Box h="100%">
            <BackgroundImage
                src="https://wallpaperaccess.com/full/3037928.jpg"
                radius="xs"
                h="100%"
            >
                <Stack  h="100%">
                    <Center p="md" style={{ margin: "auto" }}>
                        <Stack>
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                textAlign: 'center'
                            }}>{t('HomePageTitle')}</Text>

                            <Image src={Logo} miw={{ xs: 300, sm: 500, md: 600, lg: 700, xl: 800 }}></Image>

                            <Group position="center">
                                <Button variant="outline" color="red" radius="md" size="lg" uppercase>
                                    {t('ButtonPlayFree')}
                                </Button>
                            </Group>

                        </Stack>
                    </Center>
                </Stack>
            </BackgroundImage>
        </Box>
    )
}

export default Home