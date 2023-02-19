import { Grid, Stack, Card, LoadingOverlay, Image, Group, Text, Badge, SimpleGrid } from "@mantine/core"
import { useEffect, useState } from "react"
import { getApi } from "../../api/valorantApi"
import { useAppContext } from "../../contex"

function List() {
    const [maps, setMaps] = useState([])
    const [isLoading, setLoading] = useState(true)
    const { setting } = useAppContext()

    useEffect(() => {
        const fecthData = async () => {
            const res = await getApi(`/maps?language=${setting.language}`)

            setMaps(res.data)
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
                                maps?.map((map) => (
                                    <Card shadow="sm" p="lg" radius="md" withBorder key={map.uuid}>
                                        <Card.Section>
                                            <Image
                                                src={map.splash}
                                            />
                                        </Card.Section>
                                        <Group position="apart" mt="md" mb="xs">
                                            <Text weight={500} align="center">{map.displayName}</Text>
                                            <Badge color="dark" variant="light">
                                                {map.coordinates}
                                            </Badge>
                                        </Group>
                                    </Card>
                                ))
                            }
                        </SimpleGrid>
                    </Stack>
                )
            }
        </Stack>
    )
}


export default List
