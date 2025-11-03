import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: ReactNode;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Design',
        Svg: require('@site/static/img/design.svg').default,
        description: (
            <>
                Platform design and details.
            </>
        ),
    },
    {
        title: 'Getting started',
        Svg: require('@site/static/img/getting-started.svg').default,
        description: (
            <>
                OrchesT is designed to be easily installed and
                used to get your process up and running quickly.
            </>
        ),
    },
    {
        title: 'API & Tools',
        Svg: require('@site/static/img/tools.svg').default,
        description: (
            <>
                API & Tools let you integrate the platform in your services.
            </>
        ),
    },

];

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
