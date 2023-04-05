import React from 'react'
import { CSSProperties } from 'aphrodite'
import { gql, useQuery } from '@apollo/client'
import SidebarFolder from '../Folder/Folder';
import { Colors } from '../GlobalStyles';
import View from '../View/View';
import { Link, useLocation } from 'react-router-dom';
import Paragraph from '../Paragraph/Paragraph';
import { useAuthState } from '../Auth';
import Searchbar from '../SearchBar/Searchbar';

const GET_ALL_FOLDERS = gql`
query getAllFolders {
  folders {
    id
    name
    contents {
      ...on File {
        id
        name
        created
        lastUpdated
        lastModifiedBy
      }
      ...on Folder {
        id
        name
        contents {
          ...on File {
        id
        name
        created
        lastUpdated
        lastModifiedBy
      }
      ...on Folder {
        id
        name
        contents {
          ...on File {
        id
        name
        created
        lastUpdated
        lastModifiedBy
      }
        }
      }
        }
      }
    }
  }
}
`;

type GetAllFoldersResponse = {
  folders: Folder[];
}

type FileContentItem = Folder | File;

export type Folder = {
  id: string;
  name: string;
  contents: FileContentItem[];
  __typename: "Folder";
} | null;

export type File = {
  id: string;
  name: string;
  created: string;
  lastUpdated: string;
  lastModifiedBy: string;
  __typename: "File";
}

const sidebarContainerStyle: CSSProperties = {
  backgroundColor: '#ffffff',
  borderRight: `1px solid ${Colors.harlineGrey}`,
  height: '100%',
  maxWidth: '250px',
  minWidth: '250px',
  paddingTop: '24px',
  width: '250px',
}

const adminLinksStyle: CSSProperties = {
  borderTop: `1px solid ${Colors.harlineGrey}`,
  padding: '16px',
  ':hover': {
    backgroundColor: Colors.neutralHover,
  },
  ':active': {
    backgroundColor: Colors.neutralActive,
  }
}

const adminLinkSelected: CSSProperties = {
  borderRight: `4px solid ${Colors.isuRed}`,
}

const Sidebar: React.FunctionComponent = () => {
  const location = useLocation();
  const { state } = useAuthState();
  const { data } = useQuery<GetAllFoldersResponse>(GET_ALL_FOLDERS);

  return (
    <View container flexDirection='column' justifyContent='space-between' style={sidebarContainerStyle}>
      <View container gap='4px' flexDirection='column' padding='0 0 0 8px'>
        <Searchbar></Searchbar>
        <View container flexDirection='column' gap='8px'>
          {data?.folders.map((folder, index) => {
            return (
              <SidebarFolder folder={folder} key={index}></SidebarFolder>
            );
          })}
        </View>
      </View>


      {(state.user?.isAdmin) &&
        <View container flexDirection='column' style={{ ...adminLinksStyle, ...(location.pathname === '/users' ? adminLinkSelected : {}) }}>
          <Link to='/users' style={{ textDecoration: 'none' }}><Paragraph>Manage Users</Paragraph></Link>
        </View>
      }
    </View>
  )
}
export default Sidebar;