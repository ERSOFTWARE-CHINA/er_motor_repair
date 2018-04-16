defmodule RestfulApiWeb.Permissions do
	alias MotorRepairBackendWeb.Permissions
	use Guardian, otp_app: :restful_backend,
		permissions: %{
      default: [
          :read_model01, 
          :write_model01,
          :read_model02, 
          :write_model02
      ]
    }
	use Guardian.Permissions.Bitwise

	#　通过plug做权限验证时，传递guardian plug options以简化代码
	def need_perms(permission_list) do
		[module: MotorRepairBackendWeb.Permissions, ensure: %{default: permission_list}, error_handler: MotorRepairBackendWeb.AuthErrorHandler]
	end

	# 由角色列表获得权限的整型表示
	def get_perms_from_roles(list) do
		case list do
      nil -> 0
      [] -> 0
      roles -> 
        roles
        |> Enum.map(fn(r) -> r.perms_number end)
        |> Enum.reduce(0, fn(n, acc) -> n ||| acc end)
      end
	end
	
	# 由权限列表获得权限的整型表示
	# 例子: input: %{default: [base_bit]}  output: %{default: 1}
	def get_number_from_perms(map) do
		map
		|> MotorRepairBackendWeb.Permissions.encode_permissions!
	end

	# 由权限整型表示获得权限列表
	def get_perms_from_number(%{default: perms_number} = map) do
		Permissions.decode_permissions(map)
	end

	# 获取用户权限
	def get_permissions(claims) do
		MotorRepairBackendWeb.Permissions.decode_permissions_from_claims(claims)
	end

	# 获取所有权限的列表
	def get_all_permissions() do
		MotorRepairBackendWeb.Permissions.available_permissions
	end

	# 获取最大权限数值
	def get_max_perms_number() do
		MotorRepairBackendWeb.Permissions.available_permissions
		|> MotorRepairBackendWeb.Permissions.encode_permissions!
	end

end
    