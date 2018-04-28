defmodule MotorRepairBackend.Repo.Migrations.CreateRepairinfo do
  use Ecto.Migration

  def change do
    create table(:repair_info) do
      add :no, :string                  # 单号
      add :type, :string                # 类型
      add :time_cost, :float            # 工时费用
      add :consultant, :string          # 服务顾问
      add :entry_date, :date            # 进场时间
      add :return_date, :date           # 预交车时间
      add :items, :string               # 项目（如洗车、质检、带走旧件等）
      add :customer_comment, :text      # 客户描述
      add :repairman_comment, :text     # 维修工描述
      add :advise, :text                # 维修建议
      add :mileage, :float              # 进场里程
      add :next_mileage, :float         # 下次保养里程
      add :next_date, :date             # 下次保养日期
      add :agent, :string               # 送修人
      add :agent_mobile, :string        # 送修人手机
      add :project_id, references(:projects)
      timestamps()
    end

    create table(:parts_cost) do
      add :name, :string                  # 配件名称
      add :amount, :integer               # 配件数量
      add :unit_price, :float             # 单价
      add :total, :float                  # 总价
      add :repair_info_id, references(:repair_info)
      timestamps()
    end

    create unique_index(:repair_info, [:no])

  end
end
