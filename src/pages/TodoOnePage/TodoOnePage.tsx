import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [
  
  {
    type: FieldType.Rating,
    
    
  },
  {
    type: FieldType.Line,
    title: "System info",
  },
  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
    },
    fields: [
      {
        type: FieldType.Text,
        name: "userId",
        title: "User id",
        outlined: false,
        disabled: true,
      },
      {
        type: FieldType.Checkbox,
        fieldBottomMargin: "0",
        name: "completed",
        title: "Completed",
        disabled: true,
      },
    ],
  },
  {
    type: FieldType.Line,
    title: "Common info",
  },
  {
    type: FieldType.Text,
    name: "firstName",
    title: "First name",
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Last Name",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Age",
  },

  {
    type: FieldType.Combo,
    name:"prefix",
    title: "prefix",
    
  },
  {
    type: FieldType.Expansion,
    name:"subscribed",
    title: "subscribed",
    
  },

  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "50% auto",
     
    },
    fields: [
      {
        type: FieldType.Line,
        // name: "userId",
        title: "Work",

      },
      {
        type: FieldType.Line,
        // name: "completed",
        title: "Home address",
        
        
      },
    ],
  },
  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "50% auto",
     
    },
    fields: [
      {
        type: FieldType.Items,
        // name: "userId",
        title: "Work",

      },
      {
        type: FieldType.Line,
        // name: "completed",
        title: "Home address",
        
        
      },
    ],
  },
  
    {
      type: FieldType.Text,
      name: "title",
      title: "Title",
      defaultValue: "New title",
    },
  




];

export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [
    fetchApi<ITodoItem>(`/users/${id}`)
  ] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Todo list"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
