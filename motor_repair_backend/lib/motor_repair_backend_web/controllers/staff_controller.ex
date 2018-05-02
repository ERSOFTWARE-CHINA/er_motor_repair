defmodule MotorRepairBackendWeb.StaffController do
  use MotorRepairBackendWeb, :controller
  use MotorRepairBackend.StaffManage
#  import MotorRepairBackendWeb.Permissions, only: [get_number_from_perms: 1, need_perms: 1, get_all_permissions: 0, get_max_perms_number: 0, get_perms_from_number: 1]
  alias MotorRepairBackend.StaffManage
  alias MotorRepairBackend.StaffManage.Staff


  import MotorRepairBackendWeb.AuthPlugs, only: [project_active: 2, auth_admin: 2]

  plug :project_active
  plug :auth_admin

  action_fallback MotorRepairBackendWeb.FallbackController

  def index(conn, params) do
    page = page(params, conn)
    render(conn, "index.json", page: page)
  end

  def create(conn, %{"staff" => staff_params}) do
#    staff_params = staff_params |> disable_is_root
#    role_changsets = roles_exists(staff_params, conn)
    staff_changeset = Staff.changeset(%Staff{}, staff_params)
#    staff_changeset = Ecto.Changeset.put_assoc(staff_changeset)
    with {:ok, %Staff{} = staff} <- save_create(staff_changeset, conn) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", staff_path(conn, :show, staff))
      |> render("show.json", staff: staff)
    end
  end

  def show(conn, %{"id" => id}) do
    with {:ok, staff} <- get_by_id(Staff, id, conn) do
      render(conn, "show.json", staff: staff)
    end
  end

  def update(conn, %{"id" => id, "staff" => staff_params}) do
#    staff_params = staff_params
    with {:ok, staff} <- get_by_id(Staff, id, conn,[:project]) do
 #     role_changsets = roles_exists(staff_params, conn)
      staff_changeset = Staff.changeset(staff, staff_params)
 #     staff_changeset = Ecto.Changeset.put_assoc(staff_changeset, :roles, role_changsets)
      with {:ok, %Staff{} = staff} <- save_update(staff_changeset, conn) do
        render(conn, "show.json", staff: staff)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    with {:ok, %Staff{} = staff} <- delete_by_id(Staff, id, conn) do
      render(conn, "show.json", staff: staff)
    end
  end

  # get请求中的参数为字符串类型，这里需要将id转换微integer类型，因此前台需传送数字，否则报错
  def check_staffno(conn, %{"id"=> id,"staffno" => staffno}) do
    case check_staffno_exists(%{"id"=> String.to_integer(id),"staffno" => staffno}) do
      {:ok, _} -> json conn, %{ok: "staffno ok"}
      {:error, _} -> 
        json conn, %{error: "staffno error"}
    end
  end

  # def check_staffno(conn, %{"staffno" => staffno}) do
  #   case get_by_name(Staff, conn, staffno: staffno) do
  #     nil -> json conn, %{ok: "staffno ok"}
  #     _ -> json conn, %{error: "staffno error"}
  #   end
  # end

  # 根据参数中的id获取roles，将自动忽略错误的参数
  defp staffs_exists(params, conn) do
    staffs = params
    |> Map.get("staffs", []) 
    |> Enum.filter(fn(r)-> match?(%{"id" => id}, r) end)
    |> Enum.map(fn(r) -> 
      with %{"id" => id} <- r do
        case get_by_id(Staff, id, conn) do
          {:error, _} -> nil
          {:ok, staff} -> change(Staff, role)
        end
      end
    end)
    |> Enum.filter(fn(r)-> !is_nil(r) end)
  end

  # # 创建普通用户时，不能指定is_root字段
  # defp disable_is_root(staff_params) do
  #   staff_params
  #   |> Map.update("is_root", false, fn(_) -> false end)
  # end


  # def create(conn, %{"staff" => staff_params}) do
  #   with {:ok, %Staff{} = staff} <- save_create(Staff.changeset(%Staff{}, staff_params|>convert_perms_to_number), conn) do
  #     conn
  #     |> put_status(:created)
  #     |> put_resp_header("location", staff_path(conn, :show, staff))
  #     |> render("show.json", staff: staff)
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   with {:ok, staff} <- get_by_id(Staff, id, conn) do
  #     staff = staff |> Map.update(:perms_number,%{default: []}, fn(v)-> get_perms_from_number(%{default: v}) end)
  #     render(conn, "show.json", staff: staff)
  #   end
  # end

  # def update(conn, %{"id" => id, "staff" => staff_params}) do
  #   with {:ok, staff} <- get_by_id(Staff, id, conn, [:project]) do
  #     with {:ok, %Staff{} = staff} <- save_update(Staff.changeset(staff, staff_params|>convert_perms_to_number), conn) do
  #       render(conn, "show.json", staff: staff)
  #     end
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   with {:ok, %Staff{} = staff} <- delete_by_id(Staff, id, conn) do
  #     render(conn, "show.json", staff: staff)
  #   end
  # end

  # defp convert_perms_to_number(params) do
  #   %{default: perms_number} = %{ default: params
  #   |> Map.get("perms", []) }
  #   |> get_number_from_perms

  #   params = params
  #   |> Map.update("perms_number", perms_number, fn(v) -> perms_number end)

  #   params
  # end
end
