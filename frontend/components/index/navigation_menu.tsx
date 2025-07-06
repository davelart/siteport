'use client'

import React, { forwardRef } from "react"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import classNames from "classnames"
import { usePathname } from "next/navigation"

export default function NavMenu() {
    const pathname = usePathname()
	return (
		<NavigationMenu.Root className="NavigationMenuRoot">
			<NavigationMenu.List className="NavigationMenuList">
				<NavigationMenu.Item>
                    <NavigationMenu.Link active={pathname == "/"} className={'NavigationMenuLink'} href="/">
                        Home
                    </NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
                    <NavigationMenu.Link active={pathname == "/services"} className={'NavigationMenuLink'} href="/services">
                        Services
                    </NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
					<NavigationMenu.Link active={pathname == "/tracking"} className={'NavigationMenuLink'} href="/tracking">
                        Tracking
                    </NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Item>
					<NavigationMenu.Link active={pathname == "/calculator"} className={'NavigationMenuLink'} href="/calculator">
                        Calculator
                    </NavigationMenu.Link>
				</NavigationMenu.Item>

				<NavigationMenu.Indicator className="NavigationMenuIndicator">
					<div className="Arrow" />
				</NavigationMenu.Indicator>
			</NavigationMenu.List>

			<div className="ViewportPosition">
				<NavigationMenu.Viewport className="NavigationMenuViewport" />
			</div>
		</NavigationMenu.Root>
	);
};

const ListItem = forwardRef(({ className, children, title, ...props }: any, forwardedRef) => (
		<li>
			<NavigationMenu.Link asChild>
				<a className={classNames("ListItemLink", className)} {...props} ref={forwardedRef} >
					<div className="ListItemHeading">{title}</div>
					<p className="ListItemText">{children}</p>
				</a>
			</NavigationMenu.Link>
		</li>
	),
)

ListItem.displayName = "ListItem"