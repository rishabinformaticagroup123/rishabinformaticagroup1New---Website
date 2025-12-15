import React from 'react';
import Head from 'next/head';
import { Card, Collapse, Divider, List, Space, Tag, Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const InformaticaNotesPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Informatica PowerCenter & IICS Transformation Notes | Your Website</title>
        <meta name="description" content="Comprehensive notes on Informatica PowerCenter and IICS transformations for students and professionals" />
      </Head>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={1} className="text-center">Informatica PowerCenter & IICS Transformation Notes</Title>
        
        <Paragraph>
          This comprehensive guide covers all major transformations in Informatica PowerCenter and IICS (Informatica Intelligent Cloud Services), 
          with detailed explanations, properties, and practical examples to help you master ETL development.
        </Paragraph>

        <Divider orientation="left">Transformation Basics</Divider>

        <Card>
          <Title level={4}>Transformation Types</Title>
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                title: 'Active Transformation',
                content: 'Changes the number of records passed through it (e.g., Filter, Aggregator, Joiner)'
              },
              {
                title: 'Passive Transformation',
                content: 'Does not change the number of records (e.g., Expression, Lookup)'
              },
              {
                title: 'Connected Transformation',
                content: 'Part of the pipeline, receives data directly from other transformations'
              },
              {
                title: 'Unconnected Transformation',
                content: 'Not part of the main pipeline, called by other transformations'
              }
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Text strong>{item.title}</Text>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>

        <Divider orientation="left">Core Transformations</Divider>

        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="site-collapse-custom-collapse"
        >
          {/* Source Qualifier */}
          <Panel header={<Text strong>1. Source Qualifier Transformation</Text>} key="1">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Converts source datatype into Informatica native data type. Acts as the primary interface with relational sources.
              </Paragraph>
              
              <Title level={5}>Key Properties:</Title>
              <List
                size="small"
                dataSource={[
                  'SQL Query: SQL override to filter/restrict data from source',
                  'User Defined Join: For homogeneous joins (tables from same database)',
                  'Source Filter: Filter condition (e.g., SALARY IS NOT NULL)',
                  'Select Distinct: Enable/disable to remove full row duplicates',
                  'Pre-SQL: Executes before data fetch (e.g., index creation)',
                  'Post-SQL: Executes after data fetch (e.g., index drop)',
                  'Number of Sorted Ports: Specify ports for sorting',
                  'Tracing Level: Controls amount of information in session log'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Text type="secondary">Note: If source is flat file, most properties are disabled</Text>
            </Space>
          </Panel>

          {/* Filter Transformation */}
          <Panel header={<Text strong>2. Filter Transformation</Text>} key="2">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Filters records based on specified conditions anywhere in the pipeline.
              </Paragraph>
              
              <Title level={5}>Properties:</Title>
              <List
                size="small"
                dataSource={[
                  'Filter Condition: TRUE (passes all records), FALSE (blocks all records)',
                  'Only records satisfying the condition pass through'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Example:</Title>
              <pre>
                {`-- Filter for India records with salary > 50000
COUNTRY='INDIA' AND SALARY>50000

-- Case insensitive version
LOWER(COUNTRY)='india' AND SALARY>50000`}
              </pre>
            </Space>
          </Panel>

          {/* Expression Transformation */}
          <Panel header={<Text strong>3. Expression Transformation</Text>} key="3">
            <Space direction="vertical" size="small">
              <Tag color="orange">Passive</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Used to implement business logic, calculations, and data manipulations.
              </Paragraph>
              
              <Title level={5}>Key Concepts:</Title>
              <List
                size="small"
                dataSource={[
                  'Input Ports: Receive data from upstream',
                  'Output Ports: Send data downstream',
                  'Variables: Intermediate calculations (cannot be output directly)',
                  'Execution Order: Input → Variable → Output'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Common Use Cases:</Title>
              <List
                size="small"
                dataSource={[
                  'Data formatting (e.g., phone numbers: "515.123.4567" → "+1-5151234567")',
                  'Conditional logic with IIF functions',
                  'Handling NULL values (e.g., COMMISSION_PCT NULL → 0)',
                  'String manipulations (e.g., concatenation, substring)',
                  'Date calculations (e.g., leap year detection)'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Salary Increment Example:</Title>
              <pre>
                {`IIF(SALARY<=5000, SALARY+(SALARY*0.3),
  IIF(SALARY>5000 AND SALARY<=10000, SALARY+(SALARY*0.2),
    SALARY+(SALARY*0.1)))`}
              </pre>
            </Space>
          </Panel>

          {/* Joiner Transformation */}
          <Panel header={<Text strong>4. Joiner Transformation</Text>} key="4">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Performs joins between heterogeneous sources (different databases/file systems).
              </Paragraph>
              
              <Title level={5}>Join Types:</Title>
              <List
                size="small"
                dataSource={[
                  'Normal Join',
                  'Master Outer',
                  'Detail Outer',
                  'Full Outer Join'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Performance Tips:</Title>
              <List
                size="small"
                dataSource={[
                  'Designate smaller table as master (less cache, fewer iterations)',
                  'Use partitioning when possible',
                  'Sort input data if available'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Text type="secondary">Note: For N heterogeneous sources, you need N-1 joiners</Text>
            </Space>
          </Panel>

          {/* Sorter Transformation */}
          <Panel header={<Text strong>5. Sorter Transformation</Text>} key="5">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Sorts data based on specified key ports and directions (equivalent to SQL ORDER BY).
              </Paragraph>
              
              <Title level={5}>Properties:</Title>
              <List
                size="small"
                dataSource={[
                  'Key Ports: Columns to sort by (can have multiple)',
                  'Direction: ASCENDING or DESCENDING for each key',
                  'Distinct: Remove duplicate records',
                  'Case Sensitive: Control string comparison behavior',
                  'Null Treated as Low: Determines NULL value sorting'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>

          {/* Aggregator Transformation */}
          <Panel header={<Text strong>6. Aggregator Transformation</Text>} key="6">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Performs aggregate calculations (SUM, AVG, COUNT, etc.) on groups of data.
              </Paragraph>
              
              <Title level={5}>Key Features:</Title>
              <List
                size="small"
                dataSource={[
                  'Aggregate functions: MIN(), MAX(), SUM(), AVG(), COUNT()',
                  'Group By: Define grouping columns',
                  'Outputs one record per group (or single record if no grouping)'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Performance Optimization:</Title>
              <List
                size="small"
                dataSource={[
                  'Enable Sorted Input when data is pre-sorted',
                  'Use Incremental Aggregation for large datasets'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>

          {/* Router Transformation */}
          <Panel header={<Text strong>7. Router Transformation</Text>} key="7">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Routes data to multiple output groups based on filter conditions (opposite of Union).
              </Paragraph>
              
              <Title level={5}>Key Features:</Title>
              <List
                size="small"
                dataSource={[
                  'Single input pipeline → Multiple output pipelines',
                  'Multiple filter conditions → Multiple groups',
                  'Includes a DEFAULT group for non-matching records'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>

          {/* Rank Transformation */}
          <Panel header={<Text strong>8. Rank Transformation</Text>} key="8">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Ranks records based on specified columns (similar to SQL RANK() function).
              </Paragraph>
              
              <Title level={5}>Properties:</Title>
              <List
                size="small"
                dataSource={[
                  'Rank on one or more columns',
                  'Top/Bottom: Select ranking direction',
                  'Number of Ranks: Limit output to top N/bottom N',
                  'Group By: Rank within groups'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Text type="warning">Note: Cannot do DENSE_RANK directly - use Expression transformation for this</Text>
            </Space>
          </Panel>

          {/* Sequence Generator */}
          <Panel header={<Text strong>9. Sequence Generator</Text>} key="9">
            <Space direction="vertical" size="small">
              <Tag color="orange">Passive</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Generates unique numeric values (auto-increment) for surrogate keys.
              </Paragraph>
              
              <Title level={5}>Properties:</Title>
              <List
                size="small"
                dataSource={[
                  'Start Value: Initial number (e.g., 10000000)',
                  'Increment By: Step size (usually 1)',
                  'End Value: Maximum number (default 9223372036854775807)',
                  'Current Value: Tracks last generated number',
                  'Cycle: Enable to restart after reaching end',
                  'Reset: Enable to reset sequence',
                  'Number Cached Values: Performance optimization'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>

          {/* Union Transformation */}
          <Panel header={<Text strong>10. Union Transformation</Text>} key="10">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Combines data from multiple pipelines (opposite of Router).
              </Paragraph>
              
              <Title level={5}>Key Features:</Title>
              <List
                size="small"
                dataSource={[
                  'Works with same-structured tables',
                  'Handles heterogeneous sources',
                  'Acts as UNION ALL (does not remove duplicates by default)',
                  'Multiple input pipelines → Single output pipeline'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Text type="secondary">
                Note: To remove duplicates, add a Sorter transformation with DISTINCT after the Union
              </Text>
            </Space>
          </Panel>

          {/* Lookup Transformation */}
          <Panel header={<Text strong>11. Lookup Transformation</Text>} key="11">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected/Unconnected</Tag>
              
              <Paragraph>
                Looks up data in a relational table, flat file, or other source.
              </Paragraph>
              
              <Title level={5}>Connected Lookup:</Title>
              <List
                size="small"
                dataSource={[
                  'Part of the main pipeline',
                  'Can return multiple columns',
                  'Always performs LEFT OUTER JOIN',
                  'Lookup Policy on Multiple Match: First/Last/Any value or Report Error'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Unconnected Lookup:</Title>
              <List
                size="small"
                dataSource={[
                  'Not part of main pipeline',
                  'Called via expression (LKP.LKPTRANS(LOOKUP_FIELD))',
                  'Only returns one column per lookup',
                  'Useful for conditional lookups and reusability'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Optimization:</Title>
              <List
                size="small"
                dataSource={[
                  'Use SQL Override to restrict lookup data',
                  'Apply lookup filter conditions',
                  'Cache lookup tables for performance'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>

          {/* Update Strategy */}
          <Panel header={<Text strong>12. Update Strategy Transformation</Text>} key="12">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Determines how to apply changes to target (insert, update, delete, reject).
              </Paragraph>
              
              <Title level={5}>Data Driven Flags:</Title>
              <List
                size="small"
                dataSource={[
                  'DD_INSERT (0)',
                  'DD_UPDATE (1)',
                  'DD_DELETE (2) - Often used for soft deletes',
                  'DD_REJECT (3)'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>SCD Type 1 Example:</Title>
              <pre>
                {`-- Compare MD5 hashes to detect changes
MD5() - AJHSDKFSDFSDJKHFJKHSDJKHAFS
MD5() - AJHSDKFSDFSDJKHFJKFDSFAHAFS`}
              </pre>
            </Space>
          </Panel>

          {/* Normalizer */}
          <Panel header={<Text strong>13. Normalizer Transformation</Text>} key="13">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Converts rows to columns (transposes data) - similar to SQL UNPIVOT.
              </Paragraph>
              
              <Title level={5}>Common Uses:</Title>
              <List
                size="small"
                dataSource={[
                  'Processing COBOL sources',
                  'Handling VSAM files (alternative to Source Qualifier)',
                  'Data normalization tasks'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              
              <Title level={5}>Default Ports:</Title>
              <List
                size="small"
                dataSource={[
                  'GK: Generated Key value',
                  'GCID: Generated Column ID'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>

          {/* Transaction Control */}
          <Panel header={<Text strong>14. Transaction Control Transformation</Text>} key="14">
            <Space direction="vertical" size="small">
              <Tag color="blue">Active</Tag>
              <Tag color="green">Connected</Tag>
              
              <Paragraph>
                Controls transaction boundaries (commit/rollback) for dynamic file targets.
              </Paragraph>
              
              <Title level={5}>Transaction Types:</Title>
              <List
                size="small"
                dataSource={[
                  'TC_COMMIT_BEFORE',
                  'TC_COMMIT_AFTER',
                  'TC_ROLLBACK_BEFORE',
                  'TC_ROLLBACK_AFTER',
                  'TC_CONTINUE_TRANSACTION (default)'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>

          {/* Advanced Transformations */}
          <Panel header={<Text strong>15-18. Advanced Transformations</Text>} key="15">
            <Space direction="vertical" size="small">
              <List
                size="small"
                dataSource={[
                  'SQL Transformation: For complex SQL operations instead of Joiner/Lookup',
                  'Stored Procedure Transformation: Executes database stored procedures',
                  'Java Transformation: Custom Java code for complex logic',
                  'XML Transformation: Handles XML data processing'
                ]}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Space>
          </Panel>
        </Collapse>

        <Divider orientation="left">Slowly Changing Dimensions (SCD)</Divider>

        <Card>
          <Title level={4}>SCD Types</Title>
          <List
            itemLayout="horizontal"
            dataSource={[
              {
                title: 'Type 1: No History',
                content: 'Simple update - overwrites existing data (no history maintained)'
              },
              {
                title: 'Type 2: Row-Level History',
                content: (
                  <span>
                    Maintains history via: 
                    <ul>
                      <li>Flag (current/expired)</li>
                      <li>Version numbers</li>
                      <li>Date ranges (effective/expiration dates)</li>
                    </ul>
                  </span>
                )
              },
              {
                title: 'Type 3: Recent History',
                content: 'Maintains limited history at column level (usually just previous value)'
              }
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<Text strong>{item.title}</Text>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
          
          <Title level={5} style={{ marginTop: 16 }}>Key Concepts</Title>
          <List
            size="small"
            dataSource={[
              'Primary Key: Unique identifier in OLTP systems (no NULLs/duplicates)',
              'Surrogate Key: System-generated artificial key used in dimension tables',
              'Benefits: Easier updates, preserves historical information in data warehouses'
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>

        <Divider orientation="left">IICS Specific Considerations</Divider>

        <Card>
          <Title level={4}>Cloud vs PowerCenter Differences</Title>
          <List
            size="small"
            dataSource={[
              'IICS provides cloud-native versions of all PowerCenter transformations',
              'Additional cloud-specific transformations available in IICS',
              'Similar concepts but different implementation details in cloud environment',
              'IICS offers better scalability and managed services'
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Card>
      </Space>

      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .site-collapse-custom-collapse {
          background: #fafafa;
          border-radius: 8px;
          margin-bottom: 24px;
          border: 1px solid #d9d9d9;
        }
        pre {
          background: #f6f8fa;
          padding: 12px;
          border-radius: 4px;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default InformaticaNotesPage;