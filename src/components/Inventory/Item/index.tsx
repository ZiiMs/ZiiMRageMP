import { ItemType } from '@/types/items';
import { Box, Card, Divider, Group, Image, Menu, Text, useMantineTheme } from '@mantine/core';
import { CSSProperties, forwardRef, useState } from 'react';

interface ItemProps extends ItemType {
  style?: CSSProperties;
  isDragging?: boolean;
  attributes?: any;
  listeners?: any;
  getInspect(item: ItemType): any;
}

const Item = forwardRef(
  ({ slot, getInspect, isDragging, attributes, listeners, ...props }: ItemProps, ref: any) => {
    const [openMenu, setOpenMenu] = useState(false);
    // const [updateRef, setUpdateRef] = useState(ref);
    const theme = useMantineTheme();

    const onMenuClose = () => {
      setOpenMenu(false);
    };

    // useEffect(() => {
    //   if (openMenu) {
    //     setUpdateRef(null);
    //   } else {
    //     setUpdateRef(ref);
    //   }

    //   return () => {};
    // }, [openMenu]);

    const MouseClick = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      setOpenMenu(true);
      console.log('MouseClick', e);
    };

    const style: CSSProperties = props.style
      ? props.style
      : {
          opacity: isDragging ? 0.5 : 1,
          zIndex: isDragging ? 100 : 1,
          justifyContent: 'center',
          alignItems: ' center',
        };
    return (
      <Box ref={ref}>
        <Menu
          position="bottom"
          // placement="center"
          trigger="hover"
          opened={openMenu}
          onClose={onMenuClose}
          withArrow
          control={
            <Card
              onContextMenu={MouseClick}
              {...attributes}
              {...listeners}
              shadow="sm"
              padding={0}
              style={style}
            >
              <Group
                position="left"
                direction="row"
                style={{
                  position: 'absolute',
                  zIndex: 110,
                }}
              >
                <Text
                  sx={{ padding: 0, marginLeft: 4, marginRight: 4, fontSize: 13 }}
                  weight={700}
                  color={theme.colors.dark[3]}
                >
                  {slot}{' '}
                  <Text
                    inherit
                    style={{
                      fontWeight: 700,
                    }}
                    color={theme.colors.dark[0]}
                    component="span"
                  >
                    {props.title}
                  </Text>
                </Text>
              </Group>
              <Box
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                }}
              >
                <Text
                  sx={{ padding: 0, marginRight: 4, fontSize: 14 }}
                  weight={900}
                  color={theme.colors.dark[3]}
                >
                  {props.amount}
                </Text>
              </Box>
              <Box
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image src={props.image} width={100} height={100} fit="contain" />
              </Box>
            </Card>
          }
        >
          <Menu.Label>
            <Text size="xs">
              <Text component="span" inherit color={useMantineTheme().colors.gray[1]}>
                {props.title}{' '}
              </Text>
              in slot{' '}
              <Text component="span" inherit color={useMantineTheme().colors.gray[1]}>
                {' '}
                {slot}
              </Text>
            </Text>
          </Menu.Label>
          <Menu.Item
            onClick={() =>
              getInspect({
                title: props.title,
                description: props.description,
                slot: slot,
                amount: props.amount,
                serial: props?.serial,
                image: props.image,
              })
            }
          >
            Inspect Item
          </Menu.Item>
          <Divider />
          <Menu.Item>Drop Item</Menu.Item>
        </Menu>
      </Box>
    );
  }
);

export default Item;
