defmodule MotorRepairBackend.Utils.GetTree do
  # example: 
  # input is a flat list:
  # [ %{id: 1, name: "root", parent_id: nil, children: []},
  #   %{id: 2, name: "ch1", parent_id: 1, children: []},
  #   %{id: 3, name: "ch2", parent_id: 1, children: []} ]
  # output is a tree structure:
  # %{ id:1, name:"root", parent_id: nil, 
  #    children: [%{id: 2, name: "ch1", parent_id: 1, children: []}, %{id: 3, name: "ch2", parent_id: 1, children: []} ]}
  def get_tree(list) do
    case list do
      [] -> []
      list -> 
        list
        |> Enum.reduce(%{}, fn foo, map ->
            foo = %{foo | children: Map.get(map, foo.id, [])}
            Map.update(map, foo.parent_id, [foo], fn foos -> [foo | foos] end)
        end)
        |> Map.get(nil)
        |> hd
    end
  end

end