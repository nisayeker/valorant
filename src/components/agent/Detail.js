import { Modal, BackgroundImage, Image, Card, Skeleton, Grid, Container, SimpleGrid, useMantineTheme, Stack, Text, Tabs, Avatar } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getApi } from '../../api/valorantApi'
import ReactAudioPlayer from 'react-audio-player';
import { useMediaQuery } from "@mantine/hooks";
import { useAppContext } from '../../contex';


function Detail() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [detail, setDetail] = useState()
    const fullWidth = useMediaQuery("(max-width: 1920px)");

    const { setting } = useAppContext()


    useEffect(() => {

        const fetchData = async () => {
            const res = await getApi(`/agents/${state.agentId}?language=${setting.language}`)
            setDetail(res.data)
        }

        fetchData();


    }, [])

    return (
        <>
            <Modal opened={true} size="calc(70vw - 87px)" onClose={() => navigate("/agent")} centered={true} withCloseButton={fullWidth} style={{ padding: 0 }} fullScreen={fullWidth}
                overlayOpacity={0.55}
                overlayBlur={5}>
                <BackgroundImage p={50} style={{ backgroundColor: '#ff4655' }} src='https://pbs.twimg.com/media/EVSLGyeUYAAzxAp.jpg' bg="red">
                    <Stack>
                        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 1 }]}>
                            <BackgroundImage src={detail?.background} m="md">
                                <Image
                                    src={detail?.fullPortrait}
                                    alt="Norway"
                                    sx={{ scale: "1.2", transition: "all linear 400ms" }}
                                />
                            </BackgroundImage>
                            <Grid gutter="md">
                                <Grid.Col>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 78,
                                        fontWeight: 900,
                                        lineHeight: 1.1,
                                        textAlign: 'center',
                                        fontFamily: 'Lucida Console'
                                    }} mt={100}> {detail?.displayName}</Text>
                                </Grid.Col>
                                <Grid.Col>
                                    <Stack>
                                        <Text fw={900}>{detail?.role?.displayName}</Text>
                                        <Text color='#fff'>{detail?.description}</Text>
                                    </Stack>
                                </Grid.Col>
                                <Grid.Col mt={50}>
                                    <Stack>
                                        <Tabs color="teal" defaultValue="Ability1">
                                            <Tabs.List position="center">
                                                {
                                                    detail?.abilities?.map((abiliti, index) => (
                                                        <Tabs.Tab allowTabDeactivation key={index} value={abiliti.slot}><Avatar src={abiliti.displayIcon}></Avatar></Tabs.Tab>
                                                    ))
                                                }
                                            </Tabs.List>

                                            {
                                                detail?.abilities?.map((abiliti, index) => (
                                                    <Tabs.Panel key={index} value={abiliti.slot} pt="xs" mih={150}>
                                                        <Stack>
                                                            <Text fw={900}>{abiliti.displayName}</Text>
                                                            <Text color='#fff'>{abiliti.description}</Text>
                                                        </Stack>
                                                    </Tabs.Panel>
                                                ))
                                            }
                                        </Tabs>
                                    </Stack>
                                </Grid.Col>
                                {
                                    detail?.voiceLine?.mediaList && <Grid.Col>
                                        <Stack>
                                            <ReactAudioPlayer
                                                src={detail?.voiceLine?.mediaList[0].wave}
                                                controls
                                            />
                                        </Stack>
                                    </Grid.Col>
                                }

                            </Grid>


                        </SimpleGrid>
                    </Stack>

                </BackgroundImage>
            </Modal>
        </>
    )
}


export default Detail