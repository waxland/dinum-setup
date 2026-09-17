import { Link, StyleSheet, Text, View } from '@react-pdf/renderer';

import { SourceBlockExportBlock } from '../types';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#f8f8fb',
    borderLeftWidth: 3,
    borderLeftColor: '#000091',
    borderRadius: 2,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000091',
    maxWidth: '80%',
  },
  status: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#0e793c',
    backgroundColor: '#e8f7ee',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 8,
    color: '#666666',
    marginBottom: 3,
  },
  meta: {
    fontSize: 7,
    color: '#555555',
    marginBottom: 3,
  },
  excerpt: {
    fontSize: 8,
    fontStyle: 'italic',
    color: '#222222',
    backgroundColor: '#ffffff',
    padding: 5,
    borderLeftWidth: 1,
    borderLeftColor: '#000091',
    marginVertical: 3,
  },
  summary: {
    fontSize: 8,
    color: '#333333',
    marginVertical: 2,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  footerTag: {
    fontSize: 6,
    color: '#888888',
  },
  link: {
    fontSize: 7,
    color: '#000091',
    textDecoration: 'none',
  },
});

export const blockMappingSourceBlockPDF = (
  block: SourceBlockExportBlock,
) => {
  const props = block.props;
  const metaParts = [props.meta1, props.meta2, props.meta3].filter(Boolean);

  return (
    <View wrap={false} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{props.title || 'Source Souveraine'}</Text>
        {props.status ? (
          <Text style={styles.status}>{props.status}</Text>
        ) : null}
      </View>

      {props.subtitle ? (
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      ) : null}

      {metaParts.length > 0 ? (
        <Text style={styles.meta}>{metaParts.join(' • ')}</Text>
      ) : null}

      {props.excerpt ? (
        <View style={styles.excerpt}>
          <Text>« {props.excerpt} »</Text>
        </View>
      ) : null}

      {props.summary && !props.excerpt ? (
        <Text style={styles.summary}>{props.summary}</Text>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerTag}>
          {props.verifiedAt
            ? `Vérifié le ${props.verifiedAt}`
            : 'Source certifiée État'}
        </Text>
        {props.url ? (
          <Link src={props.url} style={styles.link}>
            Consulter la source officielle ↗
          </Link>
        ) : null}
      </View>
    </View>
  );
};
