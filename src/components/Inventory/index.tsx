import { InventoryType } from '@/types/inventoryType';
import { ItemType } from '@/types/items';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Box, Grid, Group, useMantineTheme, Text } from '@mantine/core';
import { loremIpsum } from 'lorem-ipsum';
import { useEffect, useState } from 'react';
import Droppable from './Droppable';
import Item from './Item';
import Layout from './layout';
import SortableItem from './SortableItem';

function Inventory() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [IsInspecting, setIsInspecting] = useState<boolean>(false);
  const [InspectingItem, setInspectingItem] = useState<ItemType | null>();
  const [inventory, setInventory] = useState<InventoryType[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const theme = useMantineTheme();
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    for (let index = 0; index < 48; index++) {
      if (index === 0 || index === 1 || index === 5) {
        if (index === 1) {
          const tempArray: ItemType = {
            title: loremIpsum({ count: 2, units: 'words' }),
            description: loremIpsum({ count: 5 }),
            image: `https://picsum.photos/720/520?random=${index}`,
            slot: index,
            amount: 50,
          };
          console.log('Genesrating!!?', tempArray);
          setItems((prevItems) => [...prevItems, tempArray]);
        } else {
          const tempArray: ItemType = {
            title: loremIpsum({ count: 2, units: 'words' }),
            description: loremIpsum({ count: 5 }),
            image: `https://picsum.photos/720/520?random=${index}`,
            slot: index,
            amount: 1,
          };
          console.log('Genesrating!!?', tempArray);
          setItems((prevItems) => [...prevItems, tempArray]);
        }

        // const test = randomUUID();
      }
      const tempInv: InventoryType = {
        id: index.toString(),
      };
      setInventory((prevInv) => {
        console.log('items', tempInv);
        // const inv = inventory.findIndex((prevInv) => prevInv.id === index.toString());
        inventory[index] = tempInv;
        return inventory;
      });
    }

    return () => {
      // setInventory([]);
      setItems([]);
    };
  }, [setInventory, setItems]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over?.id) {
      console.log('DrasgEND');
      setInventory((invSlot) => {
        console.log(
          inventory.findIndex((invSlot) => invSlot.id === active.id),
          inventory.findIndex((invSlot) => invSlot.id === over.id)
        );
        const itemOldIndex = items.findIndex((item) => item.slot.toString() === active.id);
        const itemNewIndex = items.findIndex((item) => item.slot.toString() === over.id);
        if (items[itemNewIndex] != undefined) {
          items[itemNewIndex].slot = Number.parseInt(active.id);
          items[itemOldIndex].slot = Number.parseInt(over.id);
          setActiveId(null);

          return inventory;
        }
        items[itemOldIndex].slot = Number.parseInt(over.id);
        setActiveId(null);

        return inventory;
      });
    }
    setActiveId(null);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
  };

  const getItem = (id: string) => {
    const itemIndex = items.findIndex((item) => item.slot.toString() === id);
    return items[itemIndex];
  };

  const inspectItem = (item: ItemType) => {
    setIsInspecting(true);
    setInspectingItem(item);
    console.log('Inspecting!?!?', item);
  };

  return (
    <>
      <Group
        style={{
          margin: '12px',
        }}
        direction="column"
      >
        <Layout>
          <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <Grid m={2} columns={10}>
              {inventory.map(({}, index) => {
                const itemIndex = items.findIndex((item) => item.slot === index);
                const item = items[itemIndex];
                return (
                  <Droppable key={index} id={index.toString()}>
                    {item && activeId !== item.slot.toString() ? (
                      <SortableItem
                        key={index}
                        title={item.title}
                        description={item.description}
                        slot={item.slot}
                        amount={item.amount}
                        serial={item.serial}
                        getInspect={inspectItem}
                        image={item.image}
                      />
                    ) : (
                      <Text
                        key={index}
                        sx={{ padding: 0, marginLeft: 4, fontSize: 13 }}
                        weight={800}
                        color={theme.colors.dark[3]}
                      >
                        {index}
                      </Text>
                    )}
                  </Droppable>
                );
              })}

              <DragOverlay zIndex={200}>
                {activeId ? (
                  <Item
                    title={getItem(activeId).title}
                    description={getItem(activeId).description}
                    slot={getItem(activeId).slot}
                    isDragging={true}
                    amount={getItem(activeId).amount}
                    serial={getItem(activeId).serial}
                    getInspect={inspectItem}
                    image={getItem(activeId).image}
                  />
                ) : null}
              </DragOverlay>
            </Grid>
          </DndContext>
        </Layout>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            width: '100%',
            height: '100%',
          }}
        >
          <Box
            hidden={!IsInspecting}
            style={{
              marginTop: '0px',
              width: '450px',
              height: '250px',
              borderRadius: '8px 8px 8px 8px ',
              backgroundColor: theme.colors.dark[4],
              outline: '2px',
              outlineColor: theme.colors.dark[9],
              outlineStyle: 'solid',
            }}
          >
            <Box>
              <Text>
                Inspecting?:{' '}
                {InspectingItem ? `${InspectingItem.title} : ${InspectingItem.slot}` : null}
              </Text>
            </Box>
          </Box>
        </Box>
      </Group>
    </>
  );
}

export default Inventory;
