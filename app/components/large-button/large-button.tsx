import * as React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { Text } from "react-native"
import { ListItem } from "react-native-elements"
import EStyleSheet from "react-native-extended-stylesheet"
import { palette } from "../../theme/palette"

const styles = EStyleSheet.create({
  accountAmount: {
    fontSize: "18rem",
    color: palette.darkGrey
  },
  
  accountView: {
    marginBottom: "15rem",
    marginHorizontal: "30rem",
  },

  accountViewContainer: {
    backgroundColor: palette.white,
    borderRadius: 8,
  },

  accountViewTitle: {
    color: palette.darkGrey,
    fontWeight: "bold",
    fontSize: "18rem",
  },
})

interface ILargeButton {
  icon: React.Component,
  title: string,
  onPress: (item: any) => void,
  loading?: boolean,
  subtitle?: string
}

export const LargeButton = ({ icon, title, onPress, loading, subtitle, ...props}: ILargeButton) => {
  const Loader = () => (
    <ContentLoader height={20} width={70} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
      <Rect x="0" y="0" rx="4" ry="4" width="60" height="20" />
    </ContentLoader>
  )

  return (
    <ListItem
      style={styles.accountView}
      containerStyle={styles.accountViewContainer}
      titleStyle={styles.accountViewTitle}
      chevron
      title={title}
      onPress={onPress}
      leftAvatar={icon}
      subtitle=
        {loading && <Loader />
          ||
          subtitle &&
          <Text style={styles.accountAmount}>
            {subtitle}
          </Text>
        }
      {...props}
    />
  )
}