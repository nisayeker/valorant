import { SimpleGrid, Stack, Card, LoadingOverlay, Image, Group, Text, Button, Paper } from "@mantine/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { getApi } from "../../api/valorantApi"
import { useAppContext } from "../../contex"

function List() {
    const [weapons, setWeapons] = useState([])
    const [isLoading, setLoading] = useState(true)

    const navigate = useNavigate()
    const { setting } = useAppContext()


    useEffect(() => {
        const fecthData = async () => {
            const res = await getApi(`/weapons?language=${setting.language}`)

            setWeapons(res.data)
            setLoading(false)
        }

        fecthData();
    }, [])



    return (
        <Stack>
            {isLoading ? (
                <>
                    <LoadingOverlay visible={true} />
                </>
            ) :
                (
                    <Stack>
                        <SimpleGrid cols={5} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 2 }, { maxWidth: 'xs', cols: 1 }, { maxWidth: 'md', cols: 2 }, { maxWidth: 'lg', cols: 3 }, { maxWidth: 'xl', cols: 4 }]}>
                            {
                                weapons?.map((weapon) => (
                                    <WeaponItem weapon={weapon} key={weapon.uuid} />
                                ))
                            }
                        </SimpleGrid>
                    </Stack>
                )
            }
        </Stack>
    )
}

const WeaponItem = ({ weapon }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return <Paper shadow="sm" p="lg" radius="md" withBorder key={weapon.uuid} >
        <Stack h="100%" justify="space-between">
            <Image p={10}
                src={weapon.displayIcon} />
            <Stack justify="flex-end">
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500} align="center">{weapon.displayName}</Text>
                </Group>
                <Group position='center'>
                    <Button onClick={() => navigate('detail', {
                        state: {
                            weaponId: weapon.uuid,
                        }
                    })} variant="outline" radius="md" color="red" fullWidth>
                        {t('ButtonSkin')}
                    </Button>
                </Group>
            </Stack>
        </Stack>
    </Paper >
}


export default List
