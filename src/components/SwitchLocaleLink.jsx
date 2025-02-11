import { useMemo } from 'react'
import { DEFAULT_LOCALE, Language, mapLocaleToLanguage } from '~/packages/uniswap/src/features/language/constants.js'
import { setCurrentLanguage } from '~/packages/uniswap/src/features/settings/slice.js'
import { Trans } from '~/packages/uniswap/src/i18n/index.js'
import {useLocationLinkProps} from "~/hooks/useLocationLinkProps.js";
import {useAppDispatch} from "~/state/hooks.ts";
import {StyledInternalLink} from "~/theme/components/index.tsx";
import {navigatorLocale, useCurrentLocale, useLanguageInfo} from "~/packages/uniswap/src/features/language/hooks.jsx";
import {Text} from "@chakra-ui/react"
const useTargetLocale = (activeLocale) => {
    const browserLocale = useMemo(() => navigatorLocale(), [])

    if (browserLocale && (browserLocale !== DEFAULT_LOCALE || activeLocale !== DEFAULT_LOCALE)) {
        if (activeLocale === browserLocale) {
            return DEFAULT_LOCALE
        } else {
            return browserLocale
        }
    }
    return null
}

export function SwitchLocaleLink() {
    const activeLocale = useCurrentLocale()
    const targetLocale = useTargetLocale(activeLocale)
    const targetLanguageInfo = useLanguageInfo(targetLocale ? mapLocaleToLanguage[targetLocale] : Language.English)
    const dispatch = useAppDispatch()

    const { to } = useLocationLinkProps(targetLocale)

    if (!targetLocale || !to) {
        return null
    }

    return (
        <Text fontSize={11} opacity={0.6} hoverStyle={{ opacity: 1 }} mt="1rem">
            <Trans
                i18nKey="common.availableIn"
                components={{
                    locale: (
                        <StyledInternalLink
                            onClick={() => {
                                dispatch(setCurrentLanguage(mapLocaleToLanguage[targetLocale]))
                            }}
                            to={to}
                        >
                            {targetLanguageInfo.displayName}
                        </StyledInternalLink>
                    ),
                }}
            />
        </Text>
    )
}
